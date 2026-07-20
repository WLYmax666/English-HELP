import { useState, useEffect, useCallback } from 'react'
import './index.css'
import type { Page, TabPage, FullPage, CompletedWordSession, CompletedListening, Word, WrongWord } from './types'
import { pickWords } from './data/wordBank'
import { getCurrentUser, setCurrentUser as persistCurrentUser } from './lib/auth'
import AuthPage from './pages/AuthPage'
import Home from './pages/Home'
import WordLearning from './pages/WordLearning'
import VocabPage from './pages/VocabPage'
import ListeningPage from './pages/ListeningPage'
import ListeningPlayer from './pages/ListeningPlayer'
import ProfilePage from './pages/ProfilePage'
import QuizReview from './pages/QuizReview'
import WrongWordsPage from './pages/WrongWordsPage'

/* ====== Bottom Nav Icons ====== */
function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#4f46e5' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
function ListeningIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#4f46e5' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}
function VocabIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#4f46e5' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  )
}
function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#4f46e5' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

const TAB_ITEMS: { key: TabPage; label: string; icon: typeof HomeIcon }[] = [
  { key: 'home', label: '首页', icon: HomeIcon },
  { key: 'listening', label: '听力', icon: ListeningIcon },
  { key: 'vocab', label: '单词', icon: VocabIcon },
  { key: 'profile', label: '我的', icon: ProfileIcon },
]

const FULL_PAGES: FullPage[] = ['word-learning', 'listening-player', 'word-review', 'word-extra', 'quiz-review', 'wrong-words']

/* ====== 用户相关 key 辅助 ====== */
const wordSessionsKey = (user: string) => `english_app_word_sessions_${user}`
const listeningSessionsKey = (user: string) => `english_app_listening_sessions_${user}`
const wrongWordsKey = (user: string) => `english_app_wrong_words_${user}`

/* ============================================ */
/*                    App                       */
/* ============================================ */
export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [currentUser, setCurrentUserState] = useState<string | null>(() => getCurrentUser())

  /* ---- 持久化状态（按用户隔离，同步从 localStorage 初始化） ---- */
  const [wordSessions, setWordSessions] = useState<CompletedWordSession[]>(() => {
    const user = getCurrentUser()
    if (!user) return []
    try {
      const raw = localStorage.getItem(wordSessionsKey(user))
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  })
  const [listenings, setListenings] = useState<CompletedListening[]>(() => {
    const user = getCurrentUser()
    if (!user) return []
    try {
      const raw = localStorage.getItem(listeningSessionsKey(user))
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  })
  const [wrongWords, setWrongWords] = useState<WrongWord[]>(() => {
    const user = getCurrentUser()
    if (!user) return []
    try {
      const raw = localStorage.getItem(wrongWordsKey(user))
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  })
  const [inProgressSession, setInProgressSession] = useState<CompletedWordSession | null>(() => {
    const user = getCurrentUser()
    if (!user) return null
    try {
      const raw = localStorage.getItem(`english_app_in_progress_${user}`)
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  })

  /* 当前用户变化时加载数据 */
  useEffect(() => {
    if (!currentUser) {
      setWordSessions([])
      setListenings([])
      setWrongWords([])
      return
    }
    try {
      const raw = localStorage.getItem(wordSessionsKey(currentUser))
      if (raw) setWordSessions(JSON.parse(raw))
    } catch { /* ignore */ }
    try {
      const raw = localStorage.getItem(listeningSessionsKey(currentUser))
      if (raw) setListenings(JSON.parse(raw))
    } catch { /* ignore */ }
    try {
      const raw = localStorage.getItem(wrongWordsKey(currentUser))
      if (raw) setWrongWords(JSON.parse(raw))
    } catch { /* ignore */ }
  }, [currentUser])

  /* 自动持久化到对应用户的 key */
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(wordSessionsKey(currentUser), JSON.stringify(wordSessions))
    }
  }, [wordSessions, currentUser])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(listeningSessionsKey(currentUser), JSON.stringify(listenings))
    }
  }, [listenings, currentUser])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(wrongWordsKey(currentUser), JSON.stringify(wrongWords))
    }
  }, [wrongWords, currentUser])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`english_app_in_progress_${currentUser}`, JSON.stringify(inProgressSession))
    }
  }, [inProgressSession, currentUser])

  /* ---- Callbacks ---- */
  const addWordSession = useCallback((session: CompletedWordSession) => {
    setWordSessions((prev) => [session, ...prev])
  }, [])

  const addListening = useCallback((listening: CompletedListening) => {
    setListenings((prev) => {
      // 避免同一天同一篇音频重复记录
      const exists = prev.some(
        (s) => s.date === listening.date && s.title === listening.title,
      )
      if (exists) return prev
      return [listening, ...prev]
    })
  }, [])

  const addWrongWord = useCallback((w: WrongWord) => {
    setWrongWords((prev) => [...prev, w])
  }, [])

  const onProgress = useCallback((session: CompletedWordSession) => {
    setInProgressSession(session)
  }, [])

  const isFullPage = FULL_PAGES.includes(page as FullPage)

  /* ---- Auth callbacks ---- */
  const handleLogout = useCallback(() => {
    persistCurrentUser(null)
    setCurrentUserState(null)
    setWrongWords([])
    setPage('home')
  }, [])

  /* ---- 复习模式：传入已有单词列表 ---- */
  const [reviewWords, setReviewWords] = useState<CompletedWordSession['words']>([])

  /* ---- 当前学习会话的单词列表 ---- */
  const [sessionWords, setSessionWords] = useState<Word[]>([])

  /* ---- 导航：普通学习 vs 继续学习 ---- */
  const handleNavigate = useCallback((p: string) => {
    if (p === 'word-extra' || p === 'word-learning') {
      const today = new Date().toISOString().slice(0, 10)
      const learned = new Set<string>()
      // 排除已完成的今日会话中的单词
      wordSessions
        .filter((s) => s.date === today)
        .forEach((s) => s.words.forEach((w) => learned.add(w.word)))
      // 若存在今日进行中的会话，将其完结并排除其单词
      if (inProgressSession && inProgressSession.date === today && (inProgressSession.knownCount + inProgressSession.forgotCount > 0)) {
        inProgressSession.words.forEach((w) => learned.add(w.word))
        setWordSessions((prev) => [{ ...inProgressSession, id: Date.now().toString() }, ...prev])
        setInProgressSession(null)
      }
      const count = p === 'word-extra' ? 5 : 10
      setSessionWords(pickWords(learned, count))
      setPage(p)
    } else {
      setPage(p as Page)
    }
  }, [wordSessions, inProgressSession])

  const startReview = useCallback((words: CompletedWordSession['words']) => {
    setReviewWords(words)
    setPage('word-review' as Page)
  }, [])

  /* ---- Auth 守卫 ---- */
  if (!currentUser) {
    return <AuthPage onAuth={(username) => { persistCurrentUser(username); setCurrentUserState(username) }} />
  }

  const renderPage = () => {
    switch (page) {
      case 'word-learning':
        return (
          <WordLearning
            wordList={sessionWords}
            onBack={() => setPage('home')}
            onProgress={onProgress}
            onComplete={(session) => { addWordSession(session); setInProgressSession(null); setPage('home') }}
          />
        )
      case 'word-extra':
        return (
          <WordLearning
            wordList={sessionWords}
            onBack={() => setPage('home')}
            onProgress={onProgress}
            onComplete={(session) => { addWordSession(session); setInProgressSession(null); setPage('home') }}
          />
        )
      case 'word-review':
        return (
          <WordLearning
            key={Date.now()}
            wordList={reviewWords}
            onBack={() => setPage('vocab')}
            onComplete={() => setPage('vocab')}
          />
        )
      case 'listening-player':
        return (
          <ListeningPlayer
            onBack={() => setPage('home')}
            onComplete={(data) => addListening(data)}
          />
        )
      case 'quiz-review':
        return (
          <QuizReview
            onBack={() => setPage('home')}
            onComplete={() => setPage('home')}
            onWrongWord={addWrongWord}
          />
        )
      case 'home':
        return (
          <Home
            username={currentUser}
            onNavigate={handleNavigate}
            wordSessions={wordSessions}
            listenings={listenings}
            wrongWordsCount={wrongWords.length}
            inProgressSession={inProgressSession}
          />
        )
      case 'listening':
        return (
          <ListeningPage
            listenings={listenings}
            onReplay={() => setPage('listening-player')}
            onBack={() => setPage('home')}
          />
        )
      case 'vocab':
        return (
          <VocabPage
            sessions={wordSessions}
            onReview={startReview}
            onBack={() => setPage('home')}
          />
        )
      case 'profile':
        return (
          <ProfilePage
            username={currentUser}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            wordSessions={wordSessions}
            listenings={listenings}
            wrongWords={wrongWords}
          />
        )
      case 'wrong-words':
        return (
          <WrongWordsPage
            wrongWords={wrongWords}
            onBack={() => setPage('profile')}
          />
        )
    }
  }

  return (
    <div className="relative min-h-screen">
      <div className="page-enter" key={page}>
        {renderPage()}
      </div>

      {!isFullPage && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 backdrop-blur-xl border-t border-indigo-100/60 px-3 pb-3 pt-2 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
          <div className="flex items-center justify-around">
            {TAB_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => setPage(item.key)}
                className={`relative flex flex-col items-center gap-0.5 py-1.5 px-5 cursor-pointer bg-transparent border-none transition-all duration-200 ${
                  page === item.key ? 'scale-105' : ''
                }`}
              >
                {page === item.key && <div className="absolute -top-0.5 w-8 h-1 bg-indigo-500 rounded-full" />}
                <item.icon active={page === item.key} />
                <span className={`text-[11px] ${page === item.key ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {!isFullPage && <div className="h-24" />}
    </div>
  )
}

