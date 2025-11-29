<template>
  <div class="container-main section-y space-y-6">
    <div>
      <p class="section-eyebrow">Blog</p>
      <h1 class="section-title mt-2">
        Artikel & catatan.
      </h1>
      <p class="section-subtitle mt-3">
        Kumpulan tulisan seputar front-end, full-stack, dan hal teknis lainnya.
      </p>
    </div>

    <div v-if="loading" class="text-sm text-gray-400">
      Memuat artikel...
    </div>
    <div v-else-if="error" class="text-sm text-red-400">
      {{ error }}
    </div>
    <div v-else-if="posts.length === 0" class="text-sm text-gray-400">
      Belum ada artikel.
    </div>
    <div v-else class="space-y-4">
      <article
        v-for="post in posts"
        :key="post.id"
        class="glass-card p-4 md:p-5"
      >
        <p class="text-[11px] text-gray-500">
          {{ formatDate(post.published_at) }}
        </p>
        <RouterLink
          :to="`/blog/${post.slug}`"
          class="block mt-1 text-base md:text-lg font-semibold hover:text-accent-soft"
        >
          {{ post.title }}
        </RouterLink>
        <p class="text-sm text-gray-300 mt-2">
          {{ post.excerpt }}
        </p>
        <div class="flex flex-wrap gap-2 mt-3">
          <span
            v-for="tag in post.tags || []"
            :key="tag"
            class="text-[10px] px-2 py-[3px] rounded-full bg-white/10 text-gray-200"
          >
            #{{ tag }}
          </span>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { BlogService } from '@/services/blogService'
import { RouterLink } from 'vue-router'

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
    error.value = 'Gagal memuat artikel'
  } finally {
    loading.value = false
  }
})
</script>
