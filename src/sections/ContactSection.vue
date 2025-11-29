<template>
  <section id="contact" class="section-y bg-bg-main">
    <div class="container-main grid md:grid-cols-2 gap-10 items-start">
      <!-- Kolom kiri: copy & highlight -->
      <div class="flex-1 glass-card p-6 md:p-7 space-y-5">
        <p class="section-eyebrow">Contact</p>

        <h2 class="section-title mt-1">
          Mari bangun sesuatu bersama.
        </h2>

        <p class="section-subtitle max-w-md">
          Ceritakan kebutuhan project atau ide yang ingin kamu eksekusi. Saya
          akan merespons secepat mungkin melalui email, biasanya dalam
          <span class="text-accent font-medium">1–2 hari kerja</span>.
        </p>

        <div class="flex flex-wrap gap-2 text-[11px] text-gray-400 mt-2">
          <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Tersedia untuk freelance & remote
          </span>
          <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
            <span class="i-mdi-shield-check-outline text-xs"></span>
            Data tersimpan aman
          </span>
        </div>
      </div>

      <!-- Kolom kanan: form -->
      <div
        class="glass-card p-6 md:p-8 relative overflow-hidden group border border-white/5 hover:border-accent/40 transition-colors"
      >
        <!-- Glow halus di sisi kiri card -->
        <div
          class="pointer-events-none absolute inset-y-0 -left-24 w-48 bg-gradient-to-r from-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <form @submit.prevent="handleSubmit" class="space-y-4 relative z-10">
          <!-- Honeypot anti-spam (disembunyikan dari user normal) -->
          <input
            v-model="botField"
            type="text"
            autocomplete="off"
            tabindex="-1"
            class="hidden"
            aria-hidden="true"
          />

          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="block text-xs text-gray-400 mb-1">
                Nama <span class="text-red-400">*</span>
              </label>
              <input
                v-model="name"
                type="text"
                class="w-full bg-bg-main/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none
                       focus:border-accent focus:ring-1 focus:ring-accent/60 transition-all"
                placeholder="Nama lengkap kamu"
              />
            </div>

            <div>
              <label class="block text-xs text-gray-400 mb-1">
                Email <span class="text-red-400">*</span>
              </label>
              <input
                v-model="email"
                type="email"
                class="w-full bg-bg-main/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none
                       focus:border-accent focus:ring-1 focus:ring-accent/60 transition-all"
                placeholder="email@contoh.com"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs text-gray-400 mb-1">
              Pesan <span class="text-red-400">*</span>
            </label>
            <textarea
              v-model="message"
              rows="4"
              class="w-full bg-bg-main/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none
                     focus:border-accent focus:ring-1 focus:ring-accent/60 transition-all resize-y"
              placeholder="Ceritakan singkat kebutuhan project, scope, dan timeline yang kamu inginkan."
            ></textarea>
          </div>

          <!-- Pesan status -->
          <div class="min-h-[1.75rem] space-y-0.5 text-[11px]">
            <p v-if="errorMsg" class="text-red-400">
              {{ errorMsg }}
            </p>

            <p v-else-if="success" class="text-emerald-400 flex items-center gap-1">
              <span class="i-mdi-check-circle-outline text-sm"></span>
              Terima kasih! Pesan kamu sudah terkirim. Saya akan segera menghubungi kamu.
            </p>

            <p v-if="emailWarning && !errorMsg" class="text-amber-300">
              {{ emailWarning }}
            </p>
          </div>

          <!-- Tombol submit -->
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center justify-center px-5 py-2.5 rounded-xl
                   bg-accent hover:bg-accent-soft text-sm font-medium shadow-soft-glow
                   disabled:opacity-60 disabled:shadow-none transition-all
                   hover:-translate-y-[1px] active:translate-y-[0.5px]"
          >
            <span v-if="!loading" class="inline-flex items-center gap-2">
              <span class="i-mdi-send-outline text-sm"></span>
              Kirim Pesan
            </span>
            <span v-else class="inline-flex items-center gap-2">
              <span class="loader-dot" />
              Mengirim...
            </span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
// Komponen form kontak dengan validasi + Supabase (contacts) + Web3Forms
import { ref } from "vue"
import { ContactService } from "@/services/contactService"

const name = ref("")
const email = ref("")
const message = ref("")
const loading = ref(false)
const success = ref(false)
const errorMsg = ref("")
const emailWarning = ref("")
const botField = ref("") // honeypot anti-spam

// Validasi email sederhana
const isValidEmail = (value) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(value)
}

const handleSubmit = async () => {
  // reset state pesan
  errorMsg.value = ""
  emailWarning.value = ""
  success.value = false

  // ===== Honeypot: kalau field tersembunyi terisi, kemungkinan bot =====
  if (botField.value) {
    // Jangan lakukan apa-apa, langsung stop (user manusia tidak akan mengisi ini)
    return
  }

  // ===== Validasi front-end dasar =====
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    errorMsg.value = "Semua field wajib diisi."
    return
  }

  if (!isValidEmail(email.value.trim())) {
    errorMsg.value = "Format email tidak valid."
    return
  }

  loading.value = true

  const payload = {
    name: name.value.trim(),
    email: email.value.trim(),
    message: message.value.trim(),
  }

  try {
    // 1. Simpan ke Supabase (tabel contacts)
    await ContactService.createContact(payload)

    // 2. Kirim email via Web3Forms (best effort, error tidak memblokir user)
    try {
      await ContactService.sendContactEmail(payload)
    } catch (e) {
      console.error("Gagal kirim email (kontak sudah tersimpan di Supabase):", e)
      emailWarning.value =
        "Pesan kamu sudah tersimpan, tetapi email notifikasi ke saya gagal terkirim. Saya tetap bisa melihat pesanmu di dashboard."
    }

    // Kalau sampai sini, minimal data sudah tersimpan
    success.value = true
    name.value = ""
    email.value = ""
    message.value = ""
    botField.value = ""
  } catch (err) {
    console.error(err)
    errorMsg.value =
      "Terjadi kesalahan saat menyimpan pesan. Silakan coba lagi beberapa saat lagi."
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.glass-card {
  background-color: rgba(15, 23, 42, 0.96);
  border-radius: 1.5rem;
  border: 1px solid rgba(148, 163, 184, 0.25);
  backdrop-filter: blur(24px);
}

/* Loader titik kecil untuk status "Mengirim..." */
.loader-dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: #a5b4fc;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
