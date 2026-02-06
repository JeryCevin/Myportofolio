'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 text-center mb-12">
            Tentang <span className="text-blue-400">Saya</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Profile Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group max-w-lg mx-auto w-full md:mt-0"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 group-hover:scale-[1.02] transition-transform duration-300 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-600/20 backdrop-blur-sm">
                <div className="relative w-full h-full">
                  <Image
                    src="/cevin.jpeg"
                    alt="Jery Cevin"
                    fill
                    className="object-cover object-center"
                    priority
                    onError={(e) => {
                      // Hide image if error and show fallback
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  {/* Fallback jika foto error */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg"></span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl group-hover:bg-blue-400/30 transition-colors duration-300"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl group-hover:bg-purple-400/30 transition-colors duration-300"></div>
            </motion.div>

            {/* About Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-lg text-slate-300 leading-relaxed">
                Saya adalah mahasiswa S1 Teknik Informatika di <span className="text-blue-400 font-semibold">Universitas Katolik Musi Charitas</span> yang passionate dalam teknologi dan pengembangan solusi digital inovatif.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Fokus saya meliputi <span className="text-cyan-400 font-semibold">Web Development</span> dengan Django, 
                <span className="text-purple-400 font-semibold"> Mobile Development</span> dengan Android Java, 
                dan <span className="text-pink-400 font-semibold">Game Development</span> menggunakan Unity.
              </p>

              {/* Certificates Section */}
              <div className="pt-4">
                <h3 className="text-xl font-semibold text-slate-100 mb-4">Sertifikat</h3>
                <div className="space-y-3">
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300">
                    <h4 className="text-blue-400 font-semibold">Asosiasi Data Science (Junior)</h4>
                    <p className="text-slate-400 text-sm mt-1">2025</p>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300">
                    <h4 className="text-blue-400 font-semibold">Global Game Jam Palembang</h4>
                    <p className="text-slate-400 text-sm mt-1">2026</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href="#contact"
                  className="inline-block px-8 py-3 bg-blue-500/90 backdrop-blur-sm text-white rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 font-medium"
                >
                  Mari Berkolaborasi
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
