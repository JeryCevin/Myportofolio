'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { supabase } from '@/lib/supabase'

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }
        ])

      if (error) throw error

      toast.success('Pesan berhasil dikirim! Terima kasih sudah menghubungi saya.')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Gagal mengirim pesan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 text-center mb-12">
            Mari <span className="text-blue-400">Terhubung</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold text-slate-100 mb-4">Mari diskusi tentang proyek Anda!</h3>
                <p className="text-slate-400 leading-relaxed">
                  Tidak suka formulir? Kirim saya email atau hubungi melalui media sosial. 
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:jery@example.com"
                  className="flex items-center gap-4 text-slate-300 hover:text-blue-400 transition-all duration-300 group"
                >
                  <div className="p-3 bg-slate-800/50 rounded-lg group-hover:bg-blue-500/10 transition-colors duration-300 border border-slate-700/50">
                    <FaEnvelope size={20} />
                  </div>
                  <span className="font-medium">jrycevin@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/jery-cevin-2a742626a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-slate-300 hover:text-blue-400 transition-all duration-300 group"
                >
                  <div className="p-3 bg-slate-800/50 rounded-lg group-hover:bg-blue-500/10 transition-colors duration-300 border border-slate-700/50">
                    <FaLinkedin size={20} />
                  </div>
                  <span className="font-medium">LinkedIn Profile</span>
                </a>
                <a
                  href="https://github.com/JeryCevin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-slate-300 hover:text-blue-400 transition-all duration-300 group"
                >
                  <div className="p-3 bg-slate-800/50 rounded-lg group-hover:bg-blue-500/10 transition-colors duration-300 border border-slate-700/50">
                    <FaGithub size={20} />
                  </div>
                  <span className="font-medium">GitHub Profile</span>
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-4 bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50"
            >
              <div>
                <label htmlFor="name" className="block text-slate-300 mb-2 font-medium">Nama</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/80 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-slate-700/50 transition-all duration-300"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-slate-300 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/80 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-slate-700/50 transition-all duration-300"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-slate-300 mb-2 font-medium">Pesan</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 bg-slate-800/80 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-slate-700/50 transition-all duration-300 resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-2.5 bg-blue-500/90 backdrop-blur-sm text-white rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
