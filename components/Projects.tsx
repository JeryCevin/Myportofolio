'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import Image from 'next/image'
import type { Project } from '@/lib/supabase'

interface ProjectsProps {
  projects: Project[]
  loading: boolean
}

export default function Projects({ projects, loading }: ProjectsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [filter, setFilter] = useState<string>('all')

  const defaultProjects: Project[] = [
    {
      id: '1',
      title: 'Prediksi Harga Mobil',
      description: 'Proyek Skripsi: Sistem prediksi harga mobil bekas menggunakan Machine Learning dengan framework Django. Mengimplementasikan algoritma regression untuk memberikan estimasi harga yang akurat berdasarkan berbagai parameter kendaraan.',
      image_url: '',
      tech_stack: ['Django', 'Python', 'Machine Learning', 'Scikit-learn', 'Pandas'],
      demo_url: '#',
      github_url: '#',
      category: 'data-science',
      featured: true,
      created_at: '',
      order_index: 1,
    },
    {
      id: '2',
      title: 'Sistem Monitoring Pajak',
      description: 'Proyek Kerja Praktik: Merancang dan mendesain sistem monitoring pembayaran pajak yang user-friendly. Fokus pada UX/UI design untuk memudahkan tracking status pajak dan notifikasi pembayaran.',
      image_url: '',
      tech_stack: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research'],
      demo_url: '#',
      github_url: '#',
      category: 'web',
      featured: true,
      created_at: '',
      order_index: 2,
    },
    {
      id: '3',
      title: 'Unity Card Game',
      description: 'Proyek Game Jam: Card game strategy yang dikembangkan menggunakan Unity Engine. Menampilkan gameplay mechanics yang engaging dengan visual effects dan sound design yang immersive.',
      image_url: '',
      tech_stack: ['Unity', 'C#', 'Game Design', 'Animation'],
      demo_url: '#',
      github_url: '#',
      category: 'game',
      featured: true,
      created_at: '',
      order_index: 3,
    },
  ]

  const displayProjects = projects.length > 0 ? projects : defaultProjects
  const filteredProjects = filter === 'all' 
    ? displayProjects 
    : displayProjects.filter(p => p.category === filter)

  const categories = [
    { id: 'all', label: 'Semua Proyek' },
    { id: 'data-science', label: 'Data Science' },
    { id: 'web', label: 'Web Development' },
    { id: 'game', label: 'Game Development' },
  ]

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 text-center mb-12">
            Proyek <span className="text-blue-400">Unggulan</span>
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2.5 rounded-lg transition-all duration-300 font-medium ${
                  filter === cat.id
                    ? 'bg-blue-500/90 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center text-slate-400">Loading projects...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
                >
                  {/* Project Image */}
                  <div className="h-48 relative overflow-hidden bg-slate-900/50">
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      // Fallback gradient jika tidak ada gambar
                      <div className="h-full bg-gradient-to-br from-blue-500/80 via-cyan-500/70 to-purple-600/80 flex items-center justify-center">
                        <span className="text-white text-3xl font-bold drop-shadow-lg">
                          {project.title.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 mb-4 leading-relaxed text-sm">{project.description}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech_stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-lg border border-blue-500/20 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors text-sm font-medium"
                        >
                          <FaExternalLinkAlt /> Demo
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors text-sm font-medium"
                        >
                          <FaGithub /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
