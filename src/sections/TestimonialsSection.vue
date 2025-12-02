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
          <h2 class="section-title mt-2">Apa kata mereka.</h2>
        </div>
      </div>

      <!-- Loading -->
      <p v-if="loading" class="text-gray-400 text-sm">Memuat testimoni...</p>

      <!-- Error -->
      <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>

      <!-- List -->
      <div v-else class="grid md:grid-cols-3 gap-6">
        <article
          v-for="t in testimonials"
          :key="t.id"
          class="glass-card p-5 md:p-6 flex flex-col justify-between
                 hover:border-accent/60 hover:shadow-soft-glow transition-all"
        >
          <p class="text-sm text-gray-200 italic leading-relaxed">
            “{{ t.message }}”
          </p>

          <div class="mt-4 flex items-center gap-3">
            <!-- Avatar -->
            <img
              v-if="t.avatar_url"
              :src="t.avatar_url"
              :alt="t.name"
              class="h-10 w-10 rounded-full object-cover border border-white/20"
            />

            <!-- Fallback: Inisial -->
            <div
              v-else
              class="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium"
            >
              {{ getInitials(t.name) }}
            </div>

            <div>
              <p class="text-sm font-medium">{{ t.name }}</p>
              <p class="text-xs text-gray-400">
                {{ t.role }}
                <span v-if="t.company">• {{ t.company }}</span>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useIntersection } from "@/utils/useInterSection"
import { TestimonialService } from "@/services/testimonialService"

const props = defineProps({ id: String })

const sectionRef = ref(null)
const { isVisible } = useIntersection(sectionRef)

const testimonials = ref([])
const loading = ref(true)
const error = ref("")

// Ambil data dari Supabase
const loadTestimonials = async () => {
  loading.value = true
  error.value = ""

  try {
    testimonials.value = await TestimonialService.getTestimonials()
  } catch (err) {
    error.value = "Gagal memuat testimoni"
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Fungsi inisial
const getInitials = (name) => {
  if (!name) return "?"
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

onMounted(loadTestimonials)
</script>

<style scoped>
/* Animasi fade-in sudah kamu punya dari global.css */
</style>
