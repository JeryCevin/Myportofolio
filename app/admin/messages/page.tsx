'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { ContactMessage } from '@/lib/supabase'
import { FaEnvelope, FaTrash, FaCheck } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
      toast.error('Gagal memuat pesan')
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: !currentStatus })
        .eq('id', id)

      if (error) throw error

      toast.success(currentStatus ? 'Ditandai belum dibaca' : 'Ditandai sudah dibaca')
      fetchMessages()
    } catch (error) {
      console.error('Error updating message:', error)
      toast.error('Gagal mengupdate status pesan')
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Yakin ingin menghapus pesan ini?')) return

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Pesan berhasil dihapus')
      fetchMessages()
    } catch (error) {
      console.error('Error deleting message:', error)
      toast.error('Gagal menghapus pesan')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Pesan Masuk</h1>
        <p className="text-slate-400">
          Total: {messages.length} pesan | Belum dibaca: {unreadCount} pesan
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-slate-800/50 rounded-lg p-12 text-center">
          <FaEnvelope className="mx-auto text-slate-600 mb-4" size={48} />
          <p className="text-slate-400 text-lg">Belum ada pesan masuk</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`bg-slate-800/50 rounded-lg p-6 border-l-4 transition-all duration-300 hover:shadow-lg ${
                message.read
                  ? 'border-slate-600 opacity-75'
                  : 'border-blue-500 bg-slate-800/70'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-100">
                      {message.name}
                    </h3>
                    {!message.read && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium">
                        Baru
                      </span>
                    )}
                  </div>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-blue-400 hover:underline"
                  >
                    {message.email}
                  </a>
                  <p className="text-slate-500 text-sm mt-1">
                    {formatDate(message.created_at)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => markAsRead(message.id, message.read)}
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      message.read
                        ? 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                        : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                    }`}
                    title={message.read ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}
                  >
                    <FaCheck size={16} />
                  </button>
                  <button
                    onClick={() => deleteMessage(message.id)}
                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
                    title="Hapus pesan"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {message.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
