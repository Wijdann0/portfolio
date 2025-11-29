<template>
  <section
    :id="id"
    ref="sectionRef"
    class="container-main section-y"
  >
    <div :class="['fade-in-up', isVisible && 'fade-in-up-visible']">
      <div class="flex items-end justify-between mb-10">
        <div>
          <p class="section-eyebrow">Testimonials</p>
          <h2 class="section-title mt-2">
            Apa kata mereka.
          </h2>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <article
          v-for="(t, index) in testimonials"
          :key="index"
          class="glass-card p-5 md:p-6 flex flex-col justify-between
                 hover:border-accent/60 hover:shadow-soft-glow transition-all"
        >
          <p class="text-sm text-gray-200 italic leading-relaxed">
            “{{ t.message }}”
          </p>
          <div class="mt-4 flex items-center gap-3">
            <div
              class="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-sm"
            >
              <!-- Inisial sebagai avatar sederhana -->
              {{ t.initials }}
            </div>
            <div>
              <p class="text-sm font-medium">{{ t.name }}</p>
              <p class="text-xs text-gray-400">
                {{ t.role }} • {{ t.company }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
// Kartu testimoni, nantinya bisa diisi dari Supabase testimonials table
import { ref } from 'vue'
import { useIntersection } from '@/utils/useIntersection'

const props = defineProps({
  id: String
})

const sectionRef = ref(null)
const { isVisible } = useIntersection(sectionRef)

const testimonials = [
  {
    name: 'Client A',
    initials: 'CA',
    role: 'Product Manager',
    company: 'Tech Startup',
    message:
      'Sangat responsif dan cepat memahami kebutuhan produk. Hasil akhir rapi dan performanya kencang.'
  },
  {
    name: 'Client B',
    initials: 'CB',
    role: 'Founder',
    company: 'SaaS Company',
    message:
      'Implementasi desain Figma ke Vue sangat presisi. Komunikasi jelas dan terstruktur.'
  },
  {
    name: 'Client C',
    initials: 'CC',
    role: 'CTO',
    company: 'Agency',
    message:
      'Mampu bekerja mandiri dan mengambil keputusan teknis yang tepat. Sangat recommended untuk project modern stack.'
  }
]
</script>
