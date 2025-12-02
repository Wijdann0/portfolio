// src/services/testimonialService.js
// Service CRUD untuk tabel "testimonials"

import { supabase } from "@/services/supabaseClient"

export const TestimonialService = {
  async getTestimonials() {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  async createTestimonial(payload) {
    const { data, error } = await supabase
      .from("testimonials")
      .insert(payload)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateTestimonial(id, payload) {
    const { error } = await supabase
      .from("testimonials")
      .update(payload)
      .eq("id", id)

    if (error) throw error
    return true
  },

  async deleteTestimonial(id) {
    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id)

    if (error) throw error
    return true
  },
}
