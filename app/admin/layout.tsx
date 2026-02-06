'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getUser } from '@/lib/auth'
import toast from 'react-hot-toast'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Skip auth check untuk halaman login
    if (pathname === '/admin/login') {
      setLoading(false)
      return
    }
    checkAuth()
  }, [pathname])

  const checkAuth = async () => {
    const { user, error } = await getUser()
    if (error || !user) {
      toast.error('Please login to access admin panel')
      router.push('/admin/login')
    } else {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return <>{children}</>
}
