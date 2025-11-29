// src/services/contactService.js
import { supabase } from "./supabaseClient"

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
// <- ganti

export const ContactService = {
  async createContact(payload) {
    const { error } = await supabase.from("contacts").insert(payload)
    if (error) throw error
    return true
  },

  // Kirim email via Web3Forms (tanpa Edge Function)
  async sendContactEmail(payload) {
    const formData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Pesan baru dari portfolio – ${payload.name}`,
      from_name: "Portfolio Website",
      name: payload.name,
      email: payload.email,
      message: payload.message,
    }

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    if (!res.ok || data.success !== true) {
      console.error("Web3Forms error:", data)
      throw new Error("Gagal mengirim email notifikasi")
    }

    return data
  },
}
