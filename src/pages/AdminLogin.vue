<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
      <h1 class="text-2xl font-semibold mb-6 text-center">
        Admin Login
      </h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="text-xs text-gray-400 block mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full bg-bg-main border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none
                   focus:border-accent"
          />
        </div>
        <div>
          <label class="text-xs text-gray-400 block mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full bg-bg-main border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none
                   focus:border-accent"
          />
        </div>

        <p v-if="userStore.error" class="text-xs text-red-400">
          {{ userStore.error }}
        </p>

        <button
          type="submit"
          :disabled="userStore.loading"
          class="w-full mt-2 inline-flex items-center justify-center px-4 py-2.5 rounded-xl
                 bg-accent hover:bg-accent-soft text-sm font-medium
                 shadow-soft-glow disabled:opacity-60 disabled:shadow-none transition-all"
        >
          <span v-if="!userStore.loading">Masuk</span>
          <span v-else>Mengautentikasi...</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/useUserStore'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await userStore.login(email.value, password.value)
    router.push({ name: 'admin-dashboard' }) // /admin
  } catch (err) {
    console.error(err)
  }
}
</script>
