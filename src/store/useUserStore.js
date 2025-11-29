import { defineStore } from 'pinia'
import { supabase } from '@/services/supabaseClient'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false,
    initialized: false,
    error: null,
  }),
  actions: {
    async fetchUser() {
      this.loading = true
      try {
        const { data } = await supabase.auth.getUser()
        this.user = data.user
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
        this.initialized = true
      }
    },
   async login(email, password) {
  this.loading = true
  this.error = null
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error

    // Batasi hanya email tertentu yg boleh akses admin
    const allowedAdmins = ['admin@portfolio.dev']
    if (!allowedAdmins.includes(data.user.email)) {
      // langsung logout lagi
      await supabase.auth.signOut()
      throw new Error('Anda tidak memiliki akses admin.')
    }

    this.user = data.user
  } catch (err) {
    this.error = err.message
    throw err
  } finally {
    this.loading = false
  }
},
    async logout() {
      await supabase.auth.signOut()
      this.user = null
    },
  },
})
