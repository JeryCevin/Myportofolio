'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { FaArrowLeft } from 'react-icons/fa'

export default function EditProject() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    tech_stack: '',
    demo_url: '',
    github_url: '',
    category: 'web' as 'data-science' | 'web' | 'game' | 'mechanical',
    featured: false,
    order_index: 0,
  })

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      if (data) {
        setFormData({
          title: data.title,
          description: data.description,
          image_url: data.image_url || '',
          tech_stack: data.tech_stack.join(', '),
          demo_url: data.demo_url || '',
          github_url: data.github_url || '',
          category: data.category,
          featured: data.featured,
          order_index: data.order_index,
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error loading project')
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Debug: cek user authentication
      const { data: { user } } = await supabase.auth.getUser()
      console.log('Current user:', user)
      console.log('Updating project ID:', id)

      const techStackArray = formData.tech_stack.split(',').map(tech => tech.trim())

      const { data: updateData, error } = await supabase
        .from('projects')
        .update({
          title: formData.title,
          description: formData.description,
          image_url: formData.image_url,
          tech_stack: techStackArray,
          demo_url: formData.demo_url,
          github_url: formData.github_url,
          category: formData.category,
          featured: formData.featured,
          order_index: formData.order_index,
        })
        .eq('id', id)
        .select()

      if (error) {
        console.error('Update error:', error)
        toast.error(`Error: ${error.message}`)
        return
      }

      console.log('Update successful:', updateData)
      toast.success('Project updated successfully!')
      
      // Tunggu sebentar lalu redirect
      setTimeout(() => {
        router.push('/admin')
      }, 500)
    } catch (error: any) {
      console.error('Error:', error)
      toast.error(`Error updating project: ${error.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Edit Project</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://imgur.com/abc123.jpg atau /projects/image.jpg"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-gray-500 text-sm mt-2">
                Cara 1: Upload ke <a href="https://imgur.com" target="_blank" className="text-blue-400 hover:underline">Imgur.com</a> → copy URL
                <br />
                Cara 2: Simpan di folder public/projects/ → isi: /projects/namafile.jpg
              </p>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Tech Stack (comma separated) *</label>
              <input
                type="text"
                value={formData.tech_stack}
                onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                placeholder="React, TypeScript, Node.js"
                required
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="data-science">Data Science</option>
                <option value="web">Web Development</option>
                <option value="game">Game Development</option>
                <option value="mechanical">Mechanical</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Demo URL</label>
              <input
                type="url"
                value={formData.demo_url}
                onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">GitHub URL</label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Order Index</label>
              <input
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
              />
              <label htmlFor="featured" className="ml-2 text-gray-300">Featured Project</label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Project'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
