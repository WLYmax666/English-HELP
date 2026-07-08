import { useState, useCallback, useRef, useEffect } from 'react'
import type { Word, CompletedWordSession } from '../types'

/* ---------- SVG Components ---------- */
function SpeakerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  )
}

function MicOffIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
      <path d="M5 10v2a7 7 0 0 0 12 5" />
      <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  )
}

function CheckBold() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function CloseBold() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

/* ============================================ */
/*              WordLearning Page               */
/* ============================================ */

interface Props {
  onBack: () => void
  onComplete: (session: CompletedWordSession) => void
  wordList?: Word[]
}

export default function WordLearning({ onBack, onComplete, wordList }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [animClass, setAnimClass] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recognitionResult, setRecognitionResult] = useState('')
  const [knownCount, setKnownCount] = useState(0)
  const [forgotCount, setForgotCount] = useState(0)

  const words = wordList ?? []

  /* ---- Empty state (all hooks above) ---- */
  if (words.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative px-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-200/30 to-transparent rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl pointer-events-none" />
        <span className="text-5xl mb-4">🎉</span>
        <p className="text-lg font-bold text-text text-center">今天所有单词已学完！</p>
        <p className="text-sm text-text-secondary mt-1 text-center">太棒了，明天再来吧</p>
        <button
          onClick={onBack}
          className="mt-6 px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:from-indigo-700 active:scale-95 transition-all cursor-pointer"
        >
          返回首页
        </button>
      </div>
    )
  }

  const cardRef = useRef<HTMLDivElement>(null)
  const synthRef = useRef(window.speechSynthesis)
  const recognitionRef = useRef<any>(null)

  const word = words[currentIndex]
  const total = words.length

  /* ---- TTS (Text-to-Speech) ---- */
  const speak = useCallback(() => {
    if (isSpeaking) return
    const utterance = new SpeechSynthesisUtterance(word.word)
    utterance.lang = 'en-US'
    utterance.rate = 0.85
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    synthRef.current.speak(utterance)
  }, [word.word, isSpeaking])

  /* ---- Speech Recognition ---- */
  const toggleRecording = useCallback(() => {
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition

    if (!SpeechRecognitionAPI) {
      alert('您的浏览器不支持语音识别，请使用 Chrome 浏览器')
      return
    }

    if (isRecording) {
      recognitionRef.current?.stop()
      setIsRecording(false)
      return
    }

    const recognition = new SpeechRecognitionAPI()
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.maxAlternatives = 1

    recognition.onresult = (e: any) => {
      const transcript = Array.from(e.results)
        .map((r: any) => r[0].transcript)
        .join('')
      setRecognitionResult(transcript)
    }

    recognition.onerror = () => {
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
    setRecognitionResult('')
  }, [isRecording])

  /* Cleanup recognition on unmount */
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort()
      synthRef.current.cancel()
    }
  }, [])

  /* ---- Compare user speech to word ---- */
  const getSimilarity = (a: string, b: string) => {
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z']/g, '')
    return normalize(a) === normalize(b)
  }

  const matchScore =
    recognitionResult && word
      ? getSimilarity(recognitionResult, word.word)
        ? 'perfect'
        : recognitionResult.toLowerCase().includes(word.word.toLowerCase())
          ? 'good'
          : 'try-again'
      : null

  /* ---- Know / Forgot handlers ---- */
  const handleKnow = () => {
    if (animClass) return
    setKnownCount((c) => c + 1)
    setIsFlipped(false)
    setAnimClass('card-swipe-right')
    setTimeout(() => nextWord('know'), 350)
  }

  const handleForgot = () => {
    if (animClass) return
    setForgotCount((c) => c + 1)
    setIsFlipped(false)
    setAnimClass('card-swipe-left')
    setTimeout(() => nextWord('forgot'), 350)
  }

  const nextWord = (action: 'know' | 'forgot') => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1)
      setAnimClass('card-enter')
      setTimeout(() => setAnimClass(''), 300)
    } else {
      // 最后一个单词：保存会话数据
      const k = action === 'know' ? knownCount + 1 : knownCount
      const f = action === 'forgot' ? forgotCount + 1 : forgotCount
      onComplete({
        id: Date.now().toString(),
        date: new Date().toISOString().slice(0, 10),
        words,
        knownCount: k,
        forgotCount: f,
        totalCount: total,
      })
    }
  }

  const handleCardClick = () => {
    if (!animClass) setIsFlipped((f) => !f)
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-200/30 to-transparent rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-48 h-48 bg-gradient-to-tr from-amber-200/15 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* ====== Top Bar ====== */}
      <header className="relative px-4 pt-4 pb-2 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/80 border border-indigo-100/60 shadow-sm hover:bg-white transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        <div className="flex items-center gap-2.5">
          {/* Progress Pill */}
          <div className="flex items-center gap-2 bg-white/80 rounded-full pl-3 pr-3 py-1.5 border border-indigo-100/60 shadow-sm">
            <div className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="text-sm font-bold text-indigo-600">
                {currentIndex + 1}/{total}
              </span>
            </div>
          </div>

          {/* Mini progress dots */}
          <div className="flex gap-1">
            {words.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'bg-indigo-500 w-3'
                    : i < currentIndex
                      ? 'bg-green-400'
                      : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* ====== Flashcard Area ====== */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-3">
        <div
          className={`flip-container w-full max-w-sm ${animClass}`}
          ref={cardRef}
          style={{ aspectRatio: '3 / 4' }}
        >
          <div
            className={`flip-card ${isFlipped ? 'flipped' : ''}`}
            onClick={handleCardClick}
          >
            {/* ====== Card Front ====== */}
            <div className="flip-card-front bg-gradient-to-br from-indigo-500 via-indigo-500 to-purple-600 shadow-2xl shadow-indigo-400/30 p-8 flex flex-col items-center justify-center cursor-pointer select-none">
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-sm pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-sm pointer-events-none" />

              <span className="absolute top-4 left-4 text-[10px] text-white/30 font-medium tracking-widest uppercase">Front</span>

              {/* Word */}
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight text-center drop-shadow-sm">
                {word.word}
              </h1>

              {/* Phonetic */}
              <p className="mt-3 text-lg text-white/70 font-light tracking-wide">
                {word.phonetic}
              </p>

              {/* Tap hint */}
              <p className="absolute bottom-6 text-xs text-white/30 tracking-wider flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                点击翻转
              </p>
            </div>

            {/* ====== Card Back ====== */}
            <div className="flip-card-back bg-white shadow-2xl shadow-indigo-200/50 p-7 flex flex-col justify-between cursor-pointer select-none">
              <span className="absolute top-3 left-4 text-[10px] text-slate-300 font-medium tracking-widest uppercase">Back</span>

              <div className="flex-1 flex flex-col justify-center">
                {/* Meaning */}
                <p className="text-lg font-bold text-slate-800">{word.meaning}</p>

                {/* Divider */}
                <div className="my-4 h-px bg-gradient-to-r from-indigo-200 via-purple-200 to-transparent" />

                {/* Root memory aid */}
                <div className="bg-indigo-50 rounded-xl p-3.5 mb-4">
                  <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">词根记忆</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{word.root}</p>
                </div>

                {/* Examples */}
                <div className="space-y-2">
                  {word.examples.map((ex, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-indigo-400 font-bold text-sm shrink-0">•</span>
                      <p className="text-sm text-slate-600 leading-relaxed">{ex}</p>
                    </div>
                  ))}
                </div>

                {/* Movie Example */}
                <div className="mt-3 bg-amber-50 border border-amber-200/60 rounded-xl p-3">
                  <p className="text-[11px] font-bold text-amber-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    电影例句
                  </p>
                  <p className="text-sm text-amber-800 leading-relaxed">{word.movieExample}</p>
                </div>
              </div>

              <p className="text-center text-xs text-slate-300 mt-3">点击翻转</p>
            </div>
          </div>
        </div>

        {/* ====== Pronunciation & Recording ====== */}
        <div className="flex items-center gap-4 mt-6">
          {/* Speaker Button */}
          <button
            onClick={speak}
            disabled={isSpeaking}
            className="w-14 h-14 rounded-2xl bg-white shadow-lg shadow-indigo-200/40 border border-indigo-100/60 flex items-center justify-center text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 active:scale-90 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSpeaking ? (
              <div className="flex items-end gap-0.5 h-5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="wave-bar w-1 bg-indigo-500 rounded-full" style={{ height: '100%' }} />
                ))}
              </div>
            ) : (
              <SpeakerIcon />
            )}
          </button>

          {/* Microphone Button */}
          <button
            onClick={toggleRecording}
            className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              isRecording
                ? 'bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-300/50 scale-110'
                : 'bg-white shadow-lg shadow-indigo-200/40 border border-indigo-100/60 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50'
            } active:scale-90`}
          >
            {isRecording ? (
              <>
                <div className="pulse-ring absolute inset-0" />
                <MicOffIcon />
              </>
            ) : (
              <MicIcon />
            )}
          </button>
        </div>

        {/* Recognition Result Feedback */}
        {recognitionResult && (
          <div className="mt-4 px-5 py-3 bg-white rounded-2xl shadow-md border border-indigo-100/60 max-w-sm w-full">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">你的发音</span>
              {matchScore === 'perfect' && (
                <span className="text-xs font-bold text-green-500 flex items-center gap-1">
                  <CheckBold /> 完美！
                </span>
              )}
              {matchScore === 'good' && (
                <span className="text-xs font-bold text-yellow-500">接近！再试一次</span>
              )}
              {matchScore === 'try-again' && (
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                  <CloseBold /> 再试试
                </span>
              )}
            </div>
            <p className="text-sm text-slate-700 italic">"{recognitionResult}"</p>
          </div>
        )}
      </div>

      {/* ====== Bottom Action Buttons ====== */}
      <div className="relative px-5 pb-8 pt-2 flex items-center gap-4">
        {/* Forgot */}
        <button
          onClick={handleForgot}
          className="flex-1 py-4 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 border-2 border-rose-200 text-rose-600 font-bold text-base flex items-center justify-center gap-2 hover:from-rose-100 hover:to-rose-200 active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          <CloseBold />
          不认识
        </button>

        {/* Know */}
        <button
          onClick={handleKnow}
          className="flex-1 py-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 text-emerald-600 font-bold text-base flex items-center justify-center gap-2 hover:from-emerald-100 hover:to-emerald-200 active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          <CheckBold />
          认识
        </button>
      </div>
    </div>
  )
}
