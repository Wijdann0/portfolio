// Service untuk operasi CRUD projects ke Supabase
import { supabase } from '@/services/supabaseClient'

export const ProjectService = {
  async getProjects({ featuredOnly = false } = {}) {
    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (featuredOnly) {
      query = query.eq('is_featured', true)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getProjectBySlug(slug) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) throw error
    return data
  },

  async createProject(payload) {
    const { data, error } = await supabase
      .from('projects')
      .insert(payload)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateProject(id, payload) {
    const { data, error } = await supabase
      .from('projects')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deleteProject(id) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    if (error) throw error
    return true
  }
}
