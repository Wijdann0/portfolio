// src/services/storageService.js
// Helper untuk upload file (gambar) ke Supabase Storage
// Dipakai di AdminDashboard saat upload thumbnail project

import { supabase } from "@/services/supabaseClient"

// GANTI ini kalau nama bucket kamu beda
const PROJECT_BUCKET = "project-thumbnails"

/**
 * Upload thumbnail project ke Supabase Storage
 * @param {File} file - file gambar dari input <input type="file">
 * @returns {Promise<{ path: string, url: string }>}
 */
export async function uploadProjectThumbnail(file) {
  if (!file) {
    throw new Error("File gambar tidak ditemukan")
  }

  // Ambil extension (misal: jpg, png, webp)
  const ext = file.name.split(".").pop()
  // Bikin nama file random biar tidak nabrak
  const randomName =
    (typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString()) + "." + ext

  // (opsional) taruh di folder `projects/` di dalam bucket
  const filePath = `projects/${randomName}`

  // Upload ke Supabase Storage
  const { data, error } = await supabase.storage
    .from(PROJECT_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600", // browser boleh cache 1 jam
      upsert: false,        // jangan timpa file lama
    })

  if (error) {
    console.error("Error upload thumbnail:", error)
    throw error
  }

  // Ambil public URL supaya bisa langsung dipakai di <img>
  const {
    data: { publicUrl },
  } = supabase.storage.from(PROJECT_BUCKET).getPublicUrl(filePath)

  return {
    path: data.path, // path relatif di bucket, kalau nanti mau disimpan juga
    url: publicUrl,  // URL full yang bisa dipakai di project.thumbnail_url
  }
}
