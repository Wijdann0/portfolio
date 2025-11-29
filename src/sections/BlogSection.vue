<template>
  <section
    :id="id"
    ref="sectionRef"
    class="container-main section-y"
  >
    <div :class="['fade-in-up', isVisible && 'fade-in-up-visible']">
      <div class="flex items-end justify-between mb-8">
        <div>
          <p class="section-eyebrow">Blog & Articles</p>
          <h2 class="section-title mt-2">
            Menulis seputar coding & produk.
          </h2>
          <p class="section-subtitle mt-3">
            Beberapa catatan singkat seputar front-end, architecture, dan hal-hal
            teknis yang saya pelajari.
          </p>
        </div>
        <RouterLink
          to="/blog"
          class="hidden md:inline-flex text-xs text-gray-400 hover:text-white underline underline-offset-4"
        >
          Lihat semua artikel
        </RouterLink>
      </div>

      <div v-if="loading" class="text-sm text-gray-400">
        Memuat artikel...
      </div>
      <div v-else-if="error" class="text-sm text-red-400">
        Terjadi kesalahan: {{ error }}
      </div>
      <div v-else-if="posts.length === 0" class="text-sm text-gray-400">
        Belum ada artikel yang dipublikasikan.
      </div>
      <div v-else class="space-y-4">
        <article
          v-for="post in posts"
          :key="post.id"
          class="glass-card p-4 md:p-5 flex flex-col md:flex-row gap-4 items-start"
        >
          <div class="flex-1">
            <p class="text-[11px] text-gray-400">
              {{ formatDate(post.published_at) }}
            </p>
            <RouterLink
              :to="`/blog/${post.slug}`"
              class="block mt-1 text-base md:text-lg font-medium hover:text-accent-soft"
            >
              {{ post.title }}
            </RouterLink>
            <p class="text-sm text-gray-300 mt-2 line-clamp-2">
              {{ post.excerpt }}
            </p>
            <div class="flex flex-wrap gap-1.5 mt-3">
              <span
                v-for="tag in post.tags || []"
                :key="tag"
                class="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-300"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-6 md:hidden">
        <RouterLink
          to="/blog"
          class="inline-flex text-xs text-gray-400 hover:text-white underline underline-offset-4"
        >
          Lihat semua artikel
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// Blog section yang menarik data dari Supabase blog_posts
import { onMounted, ref } from 'vue'
import { BlogService } from '@/services/blogService'
import { useIntersection } from '@/utils/useIntersection'
import { RouterLink } from 'vue-router'

const props = defineProps({
  id: String
})

const sectionRef = ref(null)
const { isVisible } = useIntersection(sectionRef)

const posts = ref([])
const loading = ref(false)
const error = ref('')

const formatDate = (value) => {
  if (!value) return ''
  const d = new Date(value)
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

onMounted(async () => {
  loading.value = true
  try {
    posts.value = await BlogService.getPosts()
  } catch (err) {
    console.error(err)
    error.value = 'Gagal memuat artikel.'
  } finally {
    loading.value = false
  }
})
</script>
