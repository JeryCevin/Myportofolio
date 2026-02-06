'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import type { Skill } from '@/lib/supabase'

interface SkillsProps {
  skills: Skill[]
  loading: boolean
}

export default function Skills({ skills, loading }: SkillsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const defaultSkills = [
    { category: 'Programming Languages', name: 'Python', level: 90 },
    { category: 'Programming Languages', name: 'PHP', level: 90 },
    { category: 'Programming Languages', name: 'C#', level: 80 },
    { category: 'Programming Languages', name: 'TypeScript', level: 78 },
    { category: 'Web Development', name: 'Django', level: 90 },
    { category: 'Web Development', name: 'HTML/CSS', level: 95 },
    { category: 'Web Development', name: 'Laravel', level: 90 },
    { category: 'Web Development', name: 'Next.js', level: 75 },
    { category: 'Game Development', name: 'Unity', level: 80 },
    { category: 'Game Development', name: 'Mechanical programming', level: 80 },
    { category: 'Database', name: 'MySQL', level: 90 },
    { category: 'Database', name: 'Firebase', level: 80 },
    { category: 'Database', name: 'Supabase', level: 75 },
    { category: 'Machine Learning', name: 'Scikit-learn', level: 80 },
    { category: 'Machine Learning', name: 'Data Scientist', level: 85 },
  ]

  const displaySkills = skills.length > 0 ? skills : defaultSkills
  const categories = Array.from(new Set(displaySkills.map(s => s.category)))

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 text-center mb-12">
            <span className="text-blue-400">Skills</span> & Teknologi
          </h2>

          {loading ? (
            <div className="text-center text-slate-400">Loading skills...</div>
          ) : (
            <div className="space-y-12">
              {categories.map((category, catIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
                >
                  <h3 className="text-2xl font-semibold text-blue-400 mb-6 flex items-center">
                    <span className="w-2 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mr-3"></span>
                    {category}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {displaySkills
                      .filter(skill => skill.category === category)
                      .map((skill, index) => (
                        <div key={index} className="space-y-2 group">
                          <div className="flex justify-between text-slate-300">
                            <span className="font-medium group-hover:text-blue-400 transition-colors duration-300">{skill.name}</span>
                            <span className="text-blue-400 font-semibold">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${skill.level}%` } : {}}
                              transition={{ duration: 1, delay: catIndex * 0.1 + index * 0.05 }}
                              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-600 rounded-full relative"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                            </motion.div>
                          </div>
                        </div>
                      ))}
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
