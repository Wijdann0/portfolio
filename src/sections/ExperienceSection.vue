<template>
  <section
    :id="id"
    ref="sectionRef"
    class="container-main section-y"
  >
    <div :class="['fade-in-up', isVisible && 'fade-in-up-visible']">
      <div class="mb-10">
        <p class="section-eyebrow">Experience</p>
        <h2 class="section-title mt-2">
          Pengalaman & pendidikan.
        </h2>
      </div>

      <div class="relative flex-1 glass-card p-6 md:p-7 space-y-4">
        <div
          v-for="item in timeline"
          :key="item.title"
          class="relative pl-6 md:pl-8"
        >
          <div
            class="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-accent-soft bg-bg-main"
          ></div>

          <p class="text-[11px] uppercase tracking-[0.25em] text-gray-500">
            {{ item.period }}
          </p>
          <h3 class="text-sm md:text-base font-semibold mt-1">
            {{ item.title }}
          </h3>
          <p class="text-xs text-gray-400">
            {{ item.company }}
          </p>
          <p class="text-sm text-gray-300 mt-2">
            {{ item.description }}
          </p>
          <div class="flex flex-wrap gap-1.5 mt-3">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-300"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Timeline vertical dengan indikator bulat ala modern portfolio
import { ref } from 'vue'
import { useIntersection } from '@/utils/useIntersection'

const props = defineProps({
  id: String
})

const sectionRef = ref(null)
const { isVisible } = useIntersection(sectionRef)

const timeline = [
  {
    period: '2023 – Sekarang',
    title: 'Senior Front-end Engineer',
    company: 'Perusahaan A (Remote)',
    description:
      'Mengembangkan dashboard internal dan customer-facing web app dengan Vue 3 dan Supabase.',
    tags: ['Vue 3', 'Vite', 'Supabase']
  },
  {
    period: '2021 – 2023',
    title: 'Full-stack Developer',
    company: 'Perusahaan B',
    description:
      'Membangun sistem booking end-to-end dari frontend, backend, hingga deployment.',
    tags: ['Node.js', 'PostgreSQL', 'REST API']
  },
  {
    period: '2017 – 2021',
    title: 'Informatics / Computer Science',
    company: 'Universitas X',
    description:
      'Fokus pada pengembangan web, struktur data, dan pemrograman berorientasi objek.',
    tags: ['JavaScript', 'OOP', 'Web Dev']
  }
]
</script>
