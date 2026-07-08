import type { CompletedListening } from '../types'

interface Props {
  listenings: CompletedListening[]
  onReplay: () => void
  onBack: () => void
}

export default function ListeningPage({ listenings, onReplay, onBack }: Props) {
  const today = new Date().toISOString().slice(0, 10)

  const grouped = listenings.reduce<Record<string, CompletedListening[]>>((acc, s) => {
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
          <h1 className="text-xl font-bold text-text">学习记录 · 听力</h1>
          <div className="w-9" />
        </div>
        <p className="text-sm text-text-secondary">累计完成 {listenings.length} 篇听力</p>
      </header>

      {listenings.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-text-secondary px-5">
          <span className="text-5xl mb-4">🎧</span>
          <p className="text-base font-medium">还没有听力记录</p>
          <p className="text-sm mt-1">去首页完成一篇精听吧</p>
        </div>
      ) : (
        <div className="flex-1 px-5 space-y-5 overflow-y-auto">
          {dateKeys.map((date) => (
            <div key={date}>
              <h3 className="text-sm font-bold text-text mb-2 flex items-center gap-2">
                {formatLabel(date)}
                <span className="text-xs font-normal text-text-secondary">
                  {grouped[date].length} 篇
                </span>
              </h3>
              <div className="space-y-2.5">
                {grouped[date].map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-rose-100/60 p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center shrink-0">
                        🎧
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-text text-sm truncate">{item.title}</p>
                        <p className="text-xs text-text-secondary mt-0.5">
                          {item.transcript.length} 句 · 完成于 {item.date}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onReplay}
                      className="mt-3 w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      再次精听
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
