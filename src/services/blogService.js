// src/services/blogService.js
// Service untuk operasi CRUD blog_posts di Supabase

import { supabase } from './supabaseClient'

export const BlogService = {
  // Ambil semua artikel (urutan terbaru di atas)
  async getPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Ambil 1 artikel berdasarkan slug (dipakai di BlogDetail)
  async getPostBySlug(slug) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  },

  // Create artikel baru
  async createPost(payload) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(payload)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update artikel
  async updatePost(id, payload) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(payload)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Hapus artikel
  async deletePost(id) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  },
}
