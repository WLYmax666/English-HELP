import { useMemo, useState, useEffect } from 'react'
import type { CompletedWordSession, CompletedListening } from '../types'
import Confetti from '../components/Confetti'

/* ====== SVG Icons ====== */
function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#4f46e5">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="16 8 10 14 7 11" />
    </svg>
  )
}

/* ====== Progress Ring ====== */
function ProgressRing({ progress }: { progress: number }) {
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <div className={`absolute inset-0 rounded-full blur-xl opacity-30 transition-all duration-700 ${progress === 100 ? 'bg-green-400 scale-110' : 'bg-indigo-400'}`} />
      <svg width="160" height="160" className="-rotate-90 drop-shadow-sm">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle
          cx="80" cy="80" r={radius}
          fill="none"
          stroke={progress === 100 ? '#22c55e' : 'url(#pg)'}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        {progress === 100 ? (
          <CheckCircleIcon />
        ) : (
          <>
            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-400">{progress}%</span>
            <span className="text-xs text-text-secondary mt-0.5 tracking-wide">今日进度</span>
          </>
        )}
      </div>
    </div>
  )
}

/* ====== Props ====== */
interface Props {
  username: string
  onNavigate: (page: string) => void
  wordSessions: CompletedWordSession[]
  listenings: CompletedListening[]
  wrongWordsCount: number
  inProgressSession?: CompletedWordSession | null
}

/* ====== Home Page ====== */
export default function Home({ username, onNavigate, wordSessions, listenings, wrongWordsCount, inProgressSession }: Props) {
  /* Derive today''s progress from completed + in-progress sessions */
  const today = new Date().toISOString().slice(0, 10)
  const todaySessions = wordSessions.filter((s) => s.date === today)
  const todayInProgress = inProgressSession?.date === today ? inProgressSession.knownCount : 0
  const todayTotalWords = wordSessions.filter((s) => s.date === today).reduce((sum, s) => sum + s.totalCount, 0) + (inProgressSession?.date === today ? inProgressSession.totalCount : 0)
  const wordProgress = useMemo(
    () => todaySessions.reduce((sum, s) => sum + s.knownCount, 0) + todayInProgress,
    [todaySessions, todayInProgress],
  )
  const DAILY_GOAL = 10
  const cappedProgress = Math.min(wordProgress, DAILY_GOAL)
  const isWordDone = wordProgress >= DAILY_GOAL
  const todayListenings = useMemo(
    () => listenings.filter((s) => s.date === today).length,
    [listenings, today],
  )
  const isListeningDone = todayListenings >= 1
  const wordPortion = Math.min(wordProgress * 7, 70)
  const listeningPortion = todayListenings >= 1 ? 30 : 0
  const isDayComplete = wordPortion + listeningPortion >= 100
  const overallProgress = Math.round(wordPortion + listeningPortion)
  const streak = wordSessions.length > 0
    ? new Set(wordSessions.map((s) => s.date)).size
    : 7

  const totalWordsLearned = wordSessions.reduce((s, v) => s + v.totalCount, 0)
  const totalListeningsDone = listenings.length

  const hour = new Date().getHours()
  let greeting = ''
  if (hour < 12) greeting = 'Good morning'
  else if (hour < 18) greeting = 'Good afternoon'
  else greeting = 'Good evening'

  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })

  const [showCelebration, setShowCelebration] = useState(false)
  useEffect(() => {
    if (isDayComplete) {
      setShowCelebration(true)
      const t = setTimeout(() => setShowCelebration(false), 5000)
      return () => clearTimeout(t)
    }
  }, [isDayComplete])

  /* Floating decorative elements */
  const FLOAT_ITEMS = ['📚', '✏️', '🎯', '💡', '🌟', 'A', 'B', 'C', 'E', 'α']

  return (
    <div className="flex flex-col min-h-screen relative">
      <Confetti trigger={showCelebration} />
      {/* Decorative Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {FLOAT_ITEMS.map((item, i) => (
          <span
            key={i}
            className="absolute select-none"
            style={{
              left: `${8 + (i * 9) % 85}%`,
              top: `${8 + (i * 12) % 80}%`,
              fontSize: `${1.2 + (i % 5) * 0.4}rem`,
              opacity: 0.06,
              animation: `float-letter ${6 + (i % 3) * 2}s ease-in-out ${i * 0.7}s infinite`,
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-indigo-200/40 to-transparent rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl pointer-events-none" />
      <div className="absolute top-32 -left-16 w-40 h-40 bg-gradient-to-tr from-sky-200/30 to-transparent rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-32 h-32 bg-gradient-to-bl from-amber-200/20 to-transparent rounded-full blur-xl pointer-events-none" />

      {/* ====== Header ====== */}
      <header className="relative px-5 pt-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-text m-0 tracking-tight">
              <span className="wave-anim text-2xl mr-1.5">👋</span>
              {greeting}, {username}!
            </h1>
            <p className="text-sm text-text-secondary/80 flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {dateStr}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="shimmer-badge flex items-center gap-1.5 rounded-full pl-2.5 pr-3 py-1.5 border border-amber-200/60 shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
              <span className="text-sm font-bold text-amber-700">{streak} Days</span>
            </div>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 via-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-base shadow-md shadow-indigo-200 ring-2 ring-white">
              {username.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* ====== Hero Section ====== */}
      <section className="relative mx-4 mt-1 bg-gradient-to-br from-white to-indigo-50/80 rounded-3xl shadow-lg shadow-indigo-200/30 border border-indigo-100/60 p-7 flex flex-col items-center overflow-hidden breathe-glow">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-100/40 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-100/30 rounded-full blur-lg pointer-events-none" />
        <ProgressRing progress={overallProgress} />
        <div className="mt-4 text-center relative z-10">
          {isDayComplete ? (
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>今日已完成</span>
              </div>
              <p className="text-xs text-green-500/80 mt-0.5">太棒了！继续保持！</p>
            </div>
          ) : (
            <>
              <p className="text-lg font-bold text-text">今日打卡</p>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <p className="text-sm text-text-secondary">距离完成还需约 30 分钟</p>
              </div>
            </>
          )}
        </div>
        {!isDayComplete && (
          <button
            onClick={() => onNavigate('word-learning')}
            className="relative mt-6 w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.97] text-white font-bold text-base rounded-2xl shadow-lg shadow-indigo-400/40 btn-glow transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              开始今日学习
            </span>
          </button>
        )}
      </section>

      {/* ====== Stats Bar ====== */}
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

      {/* ====== Learned Words Section ====== */}
      <section className="mx-4 mt-4 bg-gradient-to-br from-white to-sky-50/80 rounded-3xl shadow-sm border border-sky-100/60 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center shadow-sm">
              <span className="text-2xl">📖</span>
            </div>
            <div>
              <p className="text-sm text-text-secondary/70">累计已学单词</p>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">
                {totalWordsLearned}
                <span className="text-sm font-medium ml-1 text-text-secondary">个</span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-secondary/70">今日新增</p>
            <p className="text-lg font-bold text-indigo-600">+{todayTotalWords}</p>
          </div>
        </div>
        <div className="mt-3 h-1.5 bg-sky-100/70 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${Math.min((totalWordsLearned / 55) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-text-secondary/60 mt-1.5">
          已覆盖词库 {Math.min(totalWordsLearned, 55)}/55 个单词
        </p>
      </section>

      {/* ====== Task List ====== */}
      <section className="mx-4 mt-4 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-text flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            今日任务
          </h2>
          <span className="text-xs text-text-secondary">{cappedProgress}/{DAILY_GOAL} 已完成</span>
        </div>

        <div className="space-y-3">
          {/* Word Task */}
          <div
            onClick={() => !isWordDone && onNavigate('word-learning')}
            className={`bg-white rounded-2xl border p-4 flex items-center gap-4 active:scale-[0.98] transition-all duration-150 hover:shadow-md ${isWordDone ? 'border-green-100/60 cursor-default' : 'border-indigo-100/60 cursor-pointer'}`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${isWordDone ? 'bg-gradient-to-br from-green-50 to-green-100' : 'bg-gradient-to-br from-indigo-50 to-indigo-100'}`}>
              <span className="text-2xl">{isWordDone ? '🎉' : '📖'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text">背诵 {DAILY_GOAL} 个单词</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isWordDone ? 'bg-green-50 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
                  {isWordDone ? '已完成' : `${cappedProgress}/${DAILY_GOAL}`}
                </span>
              </div>
              <div className="mt-2.5 h-2 bg-indigo-100/70 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-700 ease-out" style={{ width: `${isWordDone ? 100 : (wordProgress / DAILY_GOAL) * 100}%` }} />
              </div>
              <p className={`text-xs mt-1.5 ${isWordDone ? 'text-green-600/80 font-medium' : 'text-text-secondary/70'}`}>
                {isWordDone ? `今日 ${wordProgress} 个单词已全部掌握` : `还剩 ${Math.max(0, DAILY_GOAL - wordProgress)} 个单词`}
              </p>
            </div>
          </div>

          {/* Listening Task */}
          <div
            onClick={() => !isListeningDone && onNavigate('listening-player')}
            className={`bg-white rounded-2xl border p-4 flex items-center gap-4 active:scale-[0.98] transition-all duration-150 hover:shadow-md ${isListeningDone ? 'border-green-100/60 cursor-default' : 'border-rose-100/60 cursor-pointer hover:shadow-rose-100/30'}`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${isListeningDone ? 'bg-gradient-to-br from-green-50 to-green-100' : 'bg-gradient-to-br from-rose-50 to-rose-100'}`}>
              <span className="text-2xl">{isListeningDone ? '🎉' : '🎧'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-text">精听 1 篇电影听力</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isListeningDone ? 'bg-green-50 text-green-600' : 'bg-rose-50 text-rose-600'}`}>
                  {isListeningDone ? '已完成' : '进行中'}
                </span>
              </div>
              {isListeningDone ? (
                <p className="text-xs text-green-600/80 mt-2 font-medium">今日听力已完成 ✓</p>
              ) : (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1.5 bg-indigo-50 rounded-lg px-3 py-1.5 hover:bg-indigo-100 transition-colors">
                    <PlayIcon />
                    <span className="text-xs font-semibold text-indigo-600">开始听力</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
                    </svg>
                    <span className="text-xs text-text-secondary">约 2 分钟</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Challenge */}
          <div
            onClick={() => onNavigate('quiz-review')}
            className="bg-white rounded-2xl border border-sky-100/60 p-4 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-all duration-150 hover:shadow-md hover:shadow-sky-100/30"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-bold text-text">每日挑战 — 单词 Quiz</span>
              <p className="text-xs text-text-secondary/70 mt-1">
                {wrongWordsCount > 0 ? `错词本中有 ${wrongWordsCount} 个单词待复习` : '今日暂无错词'}
              </p>
            </div>
            <div className="text-xl">→</div>
          </div>
        </div>
      </section>

      {/* ====== 继续学习 ====== */}
      {(isWordDone || isListeningDone) && (
        <section className="mx-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-text flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              继续学习
            </h2>
            <span className="text-xs text-text-secondary">额外练习</span>
          </div>
          <div className="space-y-3">
            {isWordDone && (
              <div
                onClick={() => onNavigate('word-extra')}
                className="bg-white rounded-2xl border border-indigo-100/60 p-4 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-all duration-150 hover:shadow-md hover:shadow-indigo-100/30"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text">再学 5 个新单词</span>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">额外</span>
                  </div>
                  <p className="text-xs text-text-secondary/70 mt-1">继续扩充今日词汇量</p>
                </div>
                <div className="text-xl text-indigo-400">→</div>
              </div>
            )}
            {isListeningDone && (
              <div
                onClick={() => onNavigate('listening-player')}
                className="bg-white rounded-2xl border border-rose-100/60 p-4 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-all duration-150 hover:shadow-md hover:shadow-rose-100/30"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-2xl">🎧</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text">再听一篇电影听力</span>
                    <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">额外</span>
                  </div>
                  <p className="text-xs text-text-secondary/70 mt-1">继续练习听力，随机新篇章</p>
                </div>
                <div className="text-xl text-rose-400">→</div>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="h-24" />
    </div>
  )
}
