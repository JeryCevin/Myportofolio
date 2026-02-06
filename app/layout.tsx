import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Jery Cevin - Portfolio',
  description: 'Professional Portfolio of Jery Cevin - Data Scientist, Web Developer, Mechanical Programmer & Game Developer',
  keywords: ['Jery Cevin', 'Data Science', 'Web Development', 'Game Development', 'Mechanical Programming'],
  authors: [{ name: 'Jery Cevin' }],
  openGraph: {
    title: 'Jery Cevin - Portfolio',
    description: 'Professional Portfolio showcasing projects in Data Science, Web Development, and Game Development',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
