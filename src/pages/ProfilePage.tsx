import type { CompletedWordSession, CompletedListening, WrongWord } from '../types'

interface Props {
  username: string
  onLogout: () => void
  onNavigate: (page: string) => void
  wordSessions: CompletedWordSession[]
  listenings: CompletedListening[]
  wrongWords: WrongWord[]
}

export default function ProfilePage({ username, onLogout, onNavigate, wordSessions, listenings, wrongWords }: Props) {
  const totalWordsLearned = wordSessions.reduce((s, v) => s + v.totalCount, 0)
  const totalListeningsDone = listenings.length
  const streak = wordSessions.length > 0
    ? new Set(wordSessions.map((s) => s.date)).size
    : 0
  const initial = username.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen flex flex-col relative pb-24">
      {/* Background */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-indigo-200/40 to-transparent rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-16 w-40 h-40 bg-gradient-to-tr from-sky-200/30 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <header className="relative px-5 pt-6 pb-4">
        <h1 className="text-xl font-bold text-text">个人中心</h1>
      </header>

      {/* User Card */}
      <section className="relative mx-4 bg-gradient-to-br from-white to-indigo-50/80 rounded-3xl shadow-lg shadow-indigo-200/30 border border-indigo-100/60 p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shadow-md shadow-indigo-200 ring-2 ring-white shrink-0">
          {initial}
        </div>
        <div>
          <h2 className="text-lg font-bold text-text">{username}</h2>
          <p className="text-xs text-text-secondary/70 mt-0.5">
            累计学习 {wordSessions.length > 0 ? new Set(wordSessions.map(s => s.date)).size : 0} 天
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-4 mt-4 grid grid-cols-3 gap-2.5">
        {[
          { label: '学习天数', value: streak, unit: '天', color: 'from-indigo-500 to-indigo-400', bg: 'bg-indigo-50' },
          { label: '已背单词', value: totalWordsLearned, unit: '个', color: 'from-sky-500 to-sky-400', bg: 'bg-sky-50' },
          { label: '听力练习', value: totalListeningsDone, unit: '篇', color: 'from-rose-500 to-rose-400', bg: 'bg-rose-50' },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-3.5 text-center border border-white/60 shadow-sm`}>
            <p className="text-xs text-text-secondary/70 mb-0.5">{s.label}</p>
            <p className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${s.color}`}>
              {s.value}<span className="text-xs font-medium ml-0.5">{s.unit}</span>
            </p>
          </div>
        ))}
      </section>

      {/* Wrong Word Book */}
      <section
        onClick={() => onNavigate('wrong-words')}
        className="mx-4 mt-6 bg-white rounded-2xl border border-rose-100/60 p-4 flex items-center gap-4 shadow-sm cursor-pointer active:scale-[0.98] transition-all duration-150 hover:shadow-md"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center shrink-0 shadow-sm">
          <span className="text-2xl">📕</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-bold text-text">错词本</span>
            {wrongWords.length > 0 && (
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                {wrongWords.length} 个
              </span>
            )}
          </div>
          <p className="text-xs text-text-secondary/70 mt-1">
            {wrongWords.length > 0 ? '点击查看错词详情' : '暂无错词'}
          </p>
        </div>
        <div className="text-xl text-rose-300">→</div>
      </section>

      {/* Logout */}
      <section className="mx-4 mt-6">
        <button
          onClick={onLogout}
          className="w-full py-3.5 rounded-2xl border-2 border-rose-200 bg-rose-50 text-rose-600 font-bold text-base flex items-center justify-center gap-2 hover:bg-rose-100 active:scale-[0.97] transition-all cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          退出登录
        </button>
      </section>

      {/* Note */}
      <p className="mx-4 mt-4 text-[11px] text-text-secondary/40 text-center">
        所有数据存储在本地浏览器中，换设备或清除浏览器数据将丢失
      </p>
    </div>
  )
}
