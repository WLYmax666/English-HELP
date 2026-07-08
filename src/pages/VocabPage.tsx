import type { CompletedWordSession } from '../types'

interface Props {
  sessions: CompletedWordSession[]
  onReview: (words: CompletedWordSession['words']) => void
  onBack: () => void
}

export default function VocabPage({ sessions, onReview, onBack }: Props) {
  const today = new Date().toISOString().slice(0, 10)

  /* Group sessions by date */
  const grouped = sessions.reduce<Record<string, CompletedWordSession[]>>((acc, s) => {
    if (!acc[s.date]) acc[s.date] = []
    acc[s.date].push(s)
    return acc
  }, {})

  const dateKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  const formatLabel = (date: string) => {
    if (date === today) return '今天'
    const d = new Date(date)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    if (date === yesterday.toISOString().slice(0, 10)) return '昨天'
    return `${d.getMonth() + 1}/${d.getDate()}`
  }

  const totalLearned = sessions.reduce((sum, s) => sum + s.totalCount, 0)

  return (
    <div className="min-h-screen flex flex-col relative pb-24">
      {/* Header */}
      <header className="relative px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/80 border border-indigo-100/60 shadow-sm hover:bg-white transition-colors cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-text">学习记录 · 单词</h1>
          <div className="w-9" />
        </div>
        <p className="text-sm text-text-secondary">累计学习 {totalLearned} 个单词</p>
      </header>

      {sessions.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-text-secondary px-5">
          <span className="text-5xl mb-4">📖</span>
          <p className="text-base font-medium">还没有学习记录</p>
          <p className="text-sm mt-1">去首页开始背单词吧</p>
        </div>
      ) : (
        <div className="flex-1 px-5 space-y-5 overflow-y-auto">
          {dateKeys.map((date) => (
            <div key={date}>
              <h3 className="text-sm font-bold text-text mb-2 flex items-center gap-2">
                {formatLabel(date)}
                <span className="text-xs font-normal text-text-secondary">
                  {grouped[date].length} 次
                </span>
              </h3>
              <div className="space-y-2.5">
                {grouped[date].map((session) => (
                  <div
                    key={session.id}
                    className="bg-white rounded-2xl border border-indigo-100/60 p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📚</span>
                        <span className="font-semibold text-text text-sm">
                          {session.totalCount} 个单词
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                          认识 {session.knownCount}
                        </span>
                        {session.forgotCount > 0 && (
                          <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full font-medium">
                            不认识 {session.forgotCount}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Mini progress bar */}
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all"
                        style={{ width: `${(session.knownCount / session.totalCount) * 100}%` }}
                      />
                    </div>

                    {/* Word chips */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {session.words.slice(0, 8).map((w) => (
                        <span
                          key={w.word}
                          className="text-[11px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100"
                        >
                          {w.word}
                        </span>
                      ))}
                      {session.words.length > 8 && (
                        <span className="text-[11px] text-slate-400 px-1 self-center">
                          +{session.words.length - 8}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onReview(session.words)}
                      className="mt-3 w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      复习这组单词
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
