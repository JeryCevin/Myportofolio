import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Project {
  id: string
  title: string
  description: string
  image_url: string
  tech_stack: string[]
  demo_url?: string
  github_url?: string
  category: 'data-science' | 'web' | 'game' | 'mechanical'
  featured: boolean
  created_at: string
  order_index: number
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number
  icon?: string
  created_at: string
}

export interface Experience {
  id: string
  title: string
  company: string
  description: string
  start_date: string
  end_date?: string
  current: boolean
  created_at: string
}

export interface AboutMe {
  id: string
  bio: string
  profile_image_url?: string
  resume_url?: string
  github_url?: string
  linkedin_url?: string
  email: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  created_at: string
}
