'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, getUser } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { 
  FaSignOutAlt, 
  FaProjectDiagram, 
  FaCog, 
  FaChartBar,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEnvelope
} from 'react-icons/fa'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'settings'>('projects')
  const [projects, setProjects] = useState<any[]>([])
  const [skills, setSkills] = useState<any[]>([])
  const [messageCount, setMessageCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    loadData()
    loadUser()

    // Auto refresh saat kembali ke halaman ini
    const handleFocus = () => {
      loadData()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  // Refresh data setiap ganti tab
  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadUser = async () => {
    const { user } = await getUser()
    if (user) setUserEmail(user.email || '')
  }

  const loadData = async () => {
    try {
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })

      const { data: skillsData } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true })

      const { data: messagesData, count } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('read', false)

      if (projectsData) setProjects(projectsData)
      if (skillsData) setSkills(skillsData)
      if (count !== null) setMessageCount(count)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    const { error } = await signOut()
    if (!error) {
      toast.success('Logged out successfully')
      router.push('/admin/login')
    }
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Error deleting project')
    } else {
      toast.success('Project deleted successfully')
      loadData()
    }
  }

  const deleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return

    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Error deleting skill')
    } else {
      toast.success('Skill deleted successfully')
      loadData()
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Projects</p>
                <p className="text-white text-3xl font-bold">{projects.length}</p>
              </div>
              <FaProjectDiagram className="text-white text-4xl opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Skills</p>
                <p className="text-white text-3xl font-bold">{skills.length}</p>
              </div>
              <FaChartBar className="text-white text-4xl opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => router.push('/admin/messages')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Pesan Masuk</p>
                <p className="text-white text-3xl font-bold">
                  {messageCount}
                  {messageCount > 0 && (
                    <span className="text-lg ml-2">Baru</span>
                  )}
                </p>
              </div>
              <div className="relative">
                <FaEnvelope className="text-white text-4xl opacity-50" />
                {messageCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {messageCount > 9 ? '9+' : messageCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'projects'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'skills'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Settings
            </button>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center text-gray-400 py-12">Loading...</div>
            ) : (
              <>
                {/* Projects Tab */}
                {activeTab === 'projects' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
                      <button 
                        onClick={() => router.push('/admin/projects/new')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <FaPlus /> Add Project
                      </button>
                    </div>

                    {projects.length === 0 ? (
                      <p className="text-gray-400 text-center py-12">No projects yet. Add your first project!</p>
                    ) : (
                      <div className="space-y-4">
                        {projects.map((project) => (
                          <div
                            key={project.id}
                            className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                          >
                            <div>
                              <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                              <p className="text-gray-400 text-sm">{project.category}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => router.push(`/admin/projects/edit/${project.id}`)}
                                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => deleteProject(project.id)}
                                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Skills Tab */}
                {activeTab === 'skills' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-white">Manage Skills</h2>
                      <button 
                        onClick={() => router.push('/admin/skills/new')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <FaPlus /> Add Skill
                      </button>
                    </div>

                    {skills.length === 0 ? (
                      <p className="text-gray-400 text-center py-12">No skills yet. Add your first skill!</p>
                    ) : (
                      <div className="space-y-4">
                        {skills.map((skill) => (
                          <div
                            key={skill.id}
                            className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                          >
                            <div>
                              <h3 className="text-white font-semibold text-lg">{skill.name}</h3>
                              <p className="text-gray-400 text-sm">{skill.category} - Level: {skill.level}%</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => router.push(`/admin/skills/edit/${skill.id}`)}
                                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => deleteSkill(skill.id)}
                                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
                    <div className="space-y-6">
                      <div className="bg-gray-700 p-6 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">Profile Information</h3>
                        <p className="text-gray-400">Email: {userEmail}</p>
                      </div>
                      <div className="bg-gray-700 p-6 rounded-lg">
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <a
                          href="/"
                          target="_blank"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          View Live Portfolio →
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
