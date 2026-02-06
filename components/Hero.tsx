'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaDownload } from 'react-icons/fa'
import Image from 'next/image'

export default function Hero() {
  const [typedText, setTypedText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const texts = ['Web Development', 'Game Programmer']
  const typingSpeed = 150
  const deletingSpeed = 100
  const pauseTime = 2000 // Pause 2 detik sebelum mulai hapus

  useEffect(() => {
    const currentText = texts[textIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && typedText === currentText) {
      // Selesai mengetik, tunggu sebentar lalu mulai hapus
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && typedText === '') {
      // Selesai menghapus, pindah ke teks berikutnya
      setIsDeleting(false)
      setTextIndex((prev) => (prev + 1) % texts.length)
    } else {
      // Proses mengetik atau menghapus
      timeout = setTimeout(() => {
        if (isDeleting) {
          setTypedText(currentText.substring(0, typedText.length - 1))
        } else {
          setTypedText(currentText.substring(0, typedText.length + 1))
        }
      }, isDeleting ? deletingSpeed : typingSpeed)
    }

    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, textIndex])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-lg md:text-xl font-medium"
            >
              Hey, I am <span className="font-bold text-white">Jery Cevin</span>
            </motion.p>
            
            <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold text-white leading-tight">
              I passionate about{' '}
              <span className="text-blue-400">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
          
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl"
            >
              Eager to apply my skills and continue learning in a dynamic and innovative environment.
            </motion.p>
    

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              <a
                href="https://instagram.com/jrycevin_11"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="mailto:jrycevin@gmail.com"
                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaEnvelope size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/jery-cevin-2a742626a/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaLinkedin size={20} />
              </a>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5 font-medium"
              >
                <FaDownload size={18} />
                My Curriculum Vitae
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex justify-center items-center lg:-ml-8 -mt-20"
          >
            {/* Simple Photo Container */}
            <div className="relative w-96 h-[28rem] rounded-2xl overflow-hidden">
              <Image
                src="/jery.png"
                alt="Jery Cevin"
                fill
                className="object-cover object-center"
                priority
              />
              {/* Gradient fade overlay di bagian bawah */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
