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
          Experience & Studying.
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
import { useIntersection } from '@/utils/useInterSection'

const props = defineProps({
  id: String
})

const sectionRef = ref(null)
const { isVisible } = useIntersection(sectionRef)

const timeline = [
  {
    period: '2025 – Now',
    title: 'Information Systems',
    company: 'Universitas Bhakti Tunas Husada',
    description:
      'Studying information systems with a focus on database management,web development and Internet Of Things.',
    tags: ['Java', 'mysql','python']
  },
  {
    period: '2025 (Jan – Apr)',
    title: 'Internship at Start Up',
    company: 'Rekhatama IT Training Center',
    description:
      'Creating a company profile website using Laravel and MySQL.',
    tags: ['Node.js', 'MySQL', 'Laravel']
  },
  {
    period: '2022 – 2025',
    title: 'Software Engineering',
    company: 'SMK Negeri 4 Kota Tasikmalaya',
    description:
      'Focus on web development, data structures, and object-oriented programming.',
    tags: ['JavaScript', 'OOP', 'Web Dev']
  }
]
</script>
