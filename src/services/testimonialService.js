import { supabase } from '@/services/supabaseClient'

export const TestimonialService = {
  async getTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },
  // CRUD lainnya mirip structure
}
