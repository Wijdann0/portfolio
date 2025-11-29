<template>
  <section
    :id="id"
    ref="sectionRef"
    class="container-main section-y"
  >
    <div :class="['fade-in-up', isVisible && 'fade-in-up-visible']">
      <div class="flex items-end justify-between mb-10">
        <div>
          <p class="section-eyebrow">Services</p>
          <h2 class="section-title mt-2">
            Apa yang bisa saya bantu.
          </h2>
          <p class="section-subtitle mt-3">
            Dari landing page produk, dashboard internal, hingga sistem yang terintegrasi
            dengan Supabase di sisi backend.
          </p>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <article
          v-for="service in services"
          :key="service.title"
          class="glass-card p-5 md:p-6 relative overflow-hidden group
                 hover:border-accent/70 hover:shadow-soft-glow
                 transition-all"
        >
          <div
            class="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-accent/20 blur-2xl opacity-0
                   group-hover:opacity-100 transition-opacity"
          ></div>
          <div class="relative space-y-3">
            <div class="inline-flex items-center justify-center h-10 w-10 rounded-2xl bg-white/5">
              <span class="text-lg">{{ service.emoji }}</span>
            </div>
            <h3 class="text-base font-semibold">
              {{ service.title }}
            </h3>
            <p class="text-sm text-gray-300">
              {{ service.description }}
            </p>
            <ul class="mt-2 space-y-1.5 text-[11px] text-gray-400">
              <li v-for="item in service.items" :key="item">
                • {{ item }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
// Section Services dengan kartu-kartu ala Samsung
import { ref } from 'vue'
import { useIntersection } from '@/utils/useIntersection'

const props = defineProps({
  id: String
})

const sectionRef = ref(null)
const { isVisible } = useIntersection(sectionRef)

const services = [
  {
    emoji: '💻',
    title: 'Web App Development',
    description: 'Membangun aplikasi web modern dengan Vue 3 + Vite.',
    items: [
      'SPA & dashboard admin',
      'State management dengan Pinia',
      'Integrasi API & Supabase'
    ]
  },
  {
    emoji: '🎨',
    title: 'UI/UX Implementation',
    description: 'Menerjemahkan desain Figma menjadi kode yang pixel-perfect.',
    items: [
      'Desain responsive',
      'Dark mode friendly',
      'Komponen reusable'
    ]
  },
  {
    emoji: '⚙️',
    title: 'Full-stack Integration',
    description: 'Menghubungkan frontend dengan backend Supabase secara efisien.',
    items: [
      'Auth (login/register)',
      'CRUD database & storage',
      'Edge Functions untuk logic khusus'
    ]
  }
]
</script>
