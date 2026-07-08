import type { WrongWord } from '../types'

interface Props {
  wrongWords: WrongWord[]
  onBack: () => void
}

export default function WrongWordsPage({ wrongWords, onBack }: Props) {
  const today = new Date().toISOString().slice(0, 10)

  /* 按日期分组 */
  const grouped = wrongWords.reduce<Record<string, WrongWord[]>>((acc, w) => {
    if (!acc[w.date]) acc[w.date] = []
    acc[w.date].push(w)
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
      {/* Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-rose-200/25 to-transparent rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/80 border border-indigo-100/60 shadow-sm hover:bg-white transition-colors cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-text">错词本</h1>
          <div className="w-9" />
        </div>
        <p className="text-sm text-text-secondary">共 {wrongWords.length} 个待复习单词</p>
      </header>

      {wrongWords.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-text-secondary px-5">
          <span className="text-5xl mb-4">🎉</span>
          <p className="text-base font-medium">暂无错词</p>
          <p className="text-sm mt-1">继续保持！</p>
        </div>
      ) : (
        <div className="flex-1 px-5 space-y-5 overflow-y-auto">
          {dateKeys.map((date) => (
            <div key={date}>
              <h3 className="text-sm font-bold text-text mb-2 flex items-center gap-2">
                {formatLabel(date)}
                <span className="text-xs font-normal text-text-secondary">
                  {grouped[date].length} 个错词
                </span>
              </h3>
              <div className="space-y-2">
                {grouped[date].map((w, i) => (
                  <div
                    key={`${w.word}-${i}`}
                    className="bg-white rounded-2xl border border-rose-100/60 p-4 flex items-center justify-between shadow-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">❌</span>
                        <div>
                          <span className="font-semibold text-text text-sm">{w.word}</span>
                          <span className="text-xs text-text-secondary ml-2">{w.meaning}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-text-secondary/60 ml-2 shrink-0">{w.date}</span>
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
