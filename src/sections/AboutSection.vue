<template>
  <section
    :id="id"
    ref="sectionRef"
    class="container-main section-y"
  >
    <div
      :class="[
        'fade-in-up',
        isVisible && 'fade-in-up-visible'
      ]"
    >
      <div class="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
        <!-- Kiri: Heading & Deskripsi -->
        <div class="flex-1 glass-card p-6 md:p-7 space-y-4">
          <p class="section-eyebrow">About Me</p>
          <h2 class="section-title">
            Developer yang fokus pada
            <span class="text-accent-soft">experience</span>
            dan detail.
          </h2>
          <p class="section-subtitle">
            Saya membangun interface modern dengan Vue 3 dan ekosistem JavaScript,
            mengutamakan performa, aksesibilitas, dan desain yang konsisten.
            Terbiasa bekerja end-to-end dari frontend, backend hingga deployment.
          </p>

          <div class="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-xs text-gray-400">Fokus utama</p>
              <p class="mt-1 font-medium">Front-end Engineering</p>
            </div>
            <div>
              <p class="text-xs text-gray-400">Secondary</p>
              <p class="mt-1 font-medium">Full-stack Development</p>
            </div>
            <div>
              <p class="text-xs text-gray-400">Base Tech</p>
              <p class="mt-1 font-medium">Vue 3 · Vite · Supabase</p>
            </div>
            <div>
              <p class="text-xs text-gray-400">Working style</p>
              <p class="mt-1 font-medium">Remote · Async Friendly</p>
            </div>
          </div>
        </div>

        <!-- Kanan: Skill grid -->
        <div class="flex-1 glass-card p-6 md:p-7 space-y-4">
          <p class="text-xs text-gray-400 uppercase tracking-[0.3em]">
            Skills
          </p>

          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="bg-white/5 rounded-2xl p-3.5">
              <p class="text-[11px] text-gray-400 mb-1">Frontend</p>
              <p class="font-medium">Vue 3, Vite</p>
              <p class="text-[11px] text-gray-400 mt-1">
                Composition API, <span class="font-mono text-[10px]">script setup</span>
              </p>
            </div>
            <div class="bg-white/5 rounded-2xl p-3.5">
              <p class="text-[11px] text-gray-400 mb-1">Styling</p>
              <p class="font-medium">Tailwind CSS</p>
              <p class="text-[11px] text-gray-400 mt-1">
                Responsive, dark mode, design system
              </p>
            </div>
            <div class="bg-white/5 rounded-2xl p-3.5">
              <p class="text-[11px] text-gray-400 mb-1">Backend</p>
              <p class="font-medium">Supabase</p>
              <p class="text-[11px] text-gray-400 mt-1">
                Auth, Database, Storage, Edge Functions
              </p>
            </div>
            <div class="bg-white/5 rounded-2xl p-3.5">
              <p class="text-[11px] text-gray-400 mb-1">Tools</p>
              <p class="font-medium">Git, REST, JSON</p>
              <p class="text-[11px] text-gray-400 mt-1">
                CI/CD, deploy Netlify/Vercel
              </p>
            </div>
          </div>

          <div class="pt-1 flex items-center gap-3 text-[11px] text-gray-400">
            <span class="glow-dot"></span>
            <span>Terbuka untuk kolaborasi project menarik.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Section About dengan layout 2 kolom dan animasi fade-in
import { ref } from 'vue'
import { useIntersection } from '@/utils/useInterSection'

const props = defineProps({
  id: String
})

const sectionRef = ref(null)
const { isVisible } = useIntersection(sectionRef)
</script>

<style scoped>
/* Tidak perlu banyak style manual karena sudah pakai util Tailwind */
</style>
