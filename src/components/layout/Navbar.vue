<template>
  <header
    class="fixed top-0 left-0 right-0 z-50"
  >
    <!-- Background blur ala glassmorphism -->
    <div
      class="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between
             backdrop-blur-xl bg-bg-main/70 border border-white/5 rounded-2xl mt-3 shadow-soft-glow"
    >
      <div class="flex items-center gap-2">
        <div class="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-accent-soft" />
        <span class="font-semibold tracking-wide text-sm">Nama Kamu</span>
      </div>

      <nav class="hidden md:flex items-center gap-8 text-sm">
        <button
          v-for="item in menuItems"
          :key="item.href"
          @click="scrollToSection(item.href)"
          class="relative group"
        >
          <span class="text-gray-300 group-hover:text-white transition-colors">
            {{ item.label }}
          </span>
          <span
            class="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent group-hover:w-full transition-all"
          ></span>
        </button>
        <RouterLink
          to="/admin/login"
          class="text-gray-400 hover:text-white text-xs border border-white/10 px-3 py-1 rounded-full"
        >
          Admin
        </RouterLink>
      </nav>

      <!-- Mobile menu icon (simple) -->
      <button
        class="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/5"
        @click="toggleMobile"
      >
        <span class="sr-only">Toggle menu</span>
        <div class="space-y-1.5">
          <span class="block h-0.5 w-5 bg-white"></span>
          <span class="block h-0.5 w-5 bg-white"></span>
        </div>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

const router = useRouter()
const showMobile = ref(false)

// Menu navigasi ke section di halaman Home
const menuItems = [
  { label: 'Home', href: 'hero' },
  { label: 'About', href: 'about' },
  { label: 'Projects', href: 'projects' },
  { label: 'Experience', href: 'experience' },
  { label: 'Blog', href: 'blog' },
  { label: 'Contact', href: 'contact' }
]

const toggleMobile = () => {
  showMobile.value = !showMobile.value
}

const scrollToSection = async (id) => {
  // Kalau lagi di halaman lain, pindah ke home dulu
  if (router.currentRoute.value.name !== 'home') {
    await router.push({ name: 'home', hash: `#${id}` })
  }

  // Scroll ke element dengan id terkait
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
