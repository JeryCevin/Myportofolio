'use client'

import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-sm py-8 px-4 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-slate-400 flex items-center gap-2 font-medium">
              Made with by <span className="text-blue-400">Jery Cevin</span>
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="mailto:jery@example.com"
              className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
            >
              <FaEnvelope size={22} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800/50 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Jery Cevin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
