// Inisialisasi client Supabase
// Semua konfigurasi Supabase dikonsentrasikan di file ini

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Client Supabase utama untuk dipakai di seluruh app
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
