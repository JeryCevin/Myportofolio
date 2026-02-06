'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa'
import { supabase, type Project, type Skill } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(false) // Set false agar langsung render

  useEffect(() => {
    // Langsung set loading false untuk development
    setLoading(false)
    
    // Fetch data di background tanpa blocking render
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })

      const { data: skillsData, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true })

      if (projectsError) console.log('Projects error:', projectsError.message)
      if (skillsError) console.log('Skills error:', skillsError.message)

      if (projectsData && projectsData.length > 0) setProjects(projectsData)
      if (skillsData && skillsData.length > 0) setSkills(skillsData)
    } catch (error) {
      console.log('Fetch error:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Navbar />
      <Hero />
      <About />
      <Skills skills={skills} loading={loading} />
      <Projects projects={projects} loading={loading} />
      <Contact />
      <Footer />
    </main>
  )
}
