import { useState } from 'react'
import { registerUser, loginUser } from '../lib/auth'

interface Props {
  onAuth: (username: string) => void
}

export default function AuthPage({ onAuth }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('register')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result =
      mode === 'register'
        ? registerUser(username, password)
        : loginUser(username, password)

    setLoading(false)

    if (!result.ok) {
      setError(result.error)
      return
    }
    onAuth(username.trim())
  }

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    setError(null)
    setUsername('')
    setPassword('')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-5">
      {/* Background */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-indigo-200/30 to-transparent rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-48 h-48 bg-gradient-to-tr from-amber-200/15 to-transparent rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-tr from-sky-200/10 to-transparent rounded-full blur-xl pointer-events-none" />

      {/* Logo / Title */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl shadow-lg shadow-indigo-300/40 mb-4">
          📘
        </div>
        <h1 className="text-2xl font-bold text-text tracking-tight">英语学习助手</h1>
        <p className="text-sm text-text-secondary/70 mt-1">CET-4/6 智能备考</p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-indigo-200/30 border border-indigo-100/60 p-6">
        <h2 className="text-lg font-bold text-text mb-1">
          {mode === 'register' ? '创建账号' : '登录'}
        </h2>
        <p className="text-xs text-text-secondary/70 mb-5">
          {mode === 'register' ? '注册后学习进度将自动保存' : '欢迎回来'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary mb-1.5 block">
              用户名
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入用户名"
              maxLength={20}
              className="w-full px-4 py-3 rounded-xl border border-indigo-100/60 bg-white text-sm text-text placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-text-secondary mb-1.5 block">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              className="w-full px-4 py-3 rounded-xl border border-indigo-100/60 bg-white text-sm text-text placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400 transition-all"
            />
          </div>

          {error && (
            <p className="text-xs text-rose-500 bg-rose-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !username.trim() || !password.trim()}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.97] text-white font-bold text-base rounded-2xl shadow-lg shadow-indigo-400/40 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? '处理中...' : mode === 'register' ? '注册' : '登录'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={switchMode}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer bg-transparent border-none"
          >
            {mode === 'register' ? '已有账号？去登录' : '没有账号？去注册'}
          </button>
        </div>
      </div>

      <p className="text-[11px] text-text-secondary/40 mt-6">
        演示应用 · 密码使用 base64 编码，非安全存储
      </p>
    </div>
  )
}
