<template>
  <div class="container-main section-y max-w-3xl">
    <div v-if="loading" class="text-sm text-gray-400">
      Memuat artikel...
    </div>
    <div v-else-if="error" class="text-sm text-red-400">
      {{ error }}
    </div>
    <article v-else-if="post" class="space-y-4">
      <p class="section-eyebrow">Blog</p>
      <h1 class="text-2xl md:text-3xl font-semibold">
        {{ post.title }}
      </h1>
      <p class="text-xs text-gray-400">
        {{ formatDate(post.published_at) }}
      </p>
      <div class="flex flex-wrap gap-2 mt-2">
        <span
          v-for="tag in post.tags || []"
          :key="tag"
          class="text-[10px] px-2 py-[3px] rounded-full bg-white/10 text-gray-200"
        >
          #{{ tag }}
        </span>
      </div>
      <p class="text-sm text-gray-300 mt-4 whitespace-pre-line">
        {{ post.content }}
      </p>
    </article>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { BlogService } from '@/services/blogService'

const route = useRoute()
const post = ref(null)
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
    const data = await BlogService.getPostBySlug(route.params.slug)
    post.value = data
  } catch (err) {
    console.error(err)
    error.value = 'Artikel tidak ditemukan.'
  } finally {
    loading.value = false
  }
})
</script>
