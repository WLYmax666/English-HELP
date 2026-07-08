import { useState, useRef, useCallback, useEffect } from 'react'
import type { CompletedListening } from '../types'
import { pickRandomClip } from '../data/movieClips'
import type { MovieClip } from '../types'

/* ========== Helpers ========== */
function formatTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function findSentenceIndex(clip: MovieClip, time: number): number {
  for (let i = 0; i < clip.sentences.length; i++) {
    if (time >= clip.sentences[i].startTime && time < clip.sentences[i].endTime) {
      return i
    }
  }
  return clip.sentences.length - 1
}

const SPEEDS = [0.5, 0.75, 1.0, 1.25, 1.5]

/* ========== SVG Icons ========== */
function PlayIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
  )
}
function PauseIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
  )
}
function ReplayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  )
}

/* ============================================ */
/*            ListeningPlayer Page              */
/* ============================================ */

interface Props {
  onBack: () => void
  onComplete: (data: CompletedListening) => void
}

export default function ListeningPlayer({ onBack, onComplete }: Props) {
  /* ====== Random clip on mount ====== */
  const [clip] = useState<MovieClip>(() => pickRandomClip())

  /* ---- State ---- */
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [displayTime, setDisplayTime] = useState(0)
  const [speed, setSpeed] = useState(1.0)
  const [showTranslation, setShowTranslation] = useState(false)

  /* ---- Word lookup ---- */
  const [wordPopup, setWordPopup] = useState<{
    word: string
    definition: string
    x: number
    y: number
  } | null>(null)
  const [vocabWords, setVocabWords] = useState<string[]>([])

  /* ---- Slider drag state ---- */
  const [isDragging, setIsDragging] = useState(false)
  const [dragTime, setDragTime] = useState(0)

  /* ---- Refs ---- */
  const containerRef = useRef<HTMLDivElement>(null)
  const isPlayingRef = useRef(false)
  const speedRef = useRef(1.0)
  const activeIdxRef = useRef(0)
  const progressTimerRef = useRef<number | null>(null)
  const synthRef = useRef(window.speechSynthesis)
  const tickStartRef = useRef(0)
  const resumeTimeRef = useRef(0)
  const completedRef = useRef(false)

  /* Sync refs */
  useEffect(() => { isPlayingRef.current = isPlaying }, [isPlaying])
  useEffect(() => { speedRef.current = speed }, [speed])

  /* ====== Speech Synthesis ====== */
  const stopSpeaking = useCallback(() => {
    synthRef.current.cancel()
  }, [])

  const completeListening = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    onComplete({
      id: Date.now().toString(),
      date: new Date().toISOString().slice(0, 10),
      title: clip.title,
      transcript: clip.sentences.map((s) => ({
        english: s.english,
        chinese: s.chinese,
      })),
    })
  }, [onComplete, clip])

  const speakSentence = useCallback((index: number) => {
    synthRef.current.cancel()
    if (index >= clip.sentences.length) {
      setIsPlaying(false)
      completeListening()
      return
    }

    const sentence = clip.sentences[index]
    const utterance = new SpeechSynthesisUtterance(sentence.english)
    utterance.lang = 'en-US'
    utterance.rate = speedRef.current

    utterance.onstart = () => {
      activeIdxRef.current = index
      setActiveIndex(index)
      tickStartRef.current = performance.now()
      resumeTimeRef.current = sentence.startTime
    }

    utterance.onend = () => {
      if (isPlayingRef.current) {
        speakSentence(index + 1)
      }
    }

    utterance.onerror = () => {
      setIsPlaying(false)
    }

    synthRef.current.speak(utterance)
  }, [clip, completeListening])

  /* ====== Progress Timer ====== */
  const startProgressTimer = useCallback(() => {
    tickStartRef.current = performance.now()

    const tick = () => {
      if (!isPlayingRef.current) {
        progressTimerRef.current = null
        return
      }
      const elapsed = (performance.now() - tickStartRef.current) / 1000
      const time = resumeTimeRef.current + elapsed * speedRef.current
      setDisplayTime(Math.min(time, clip.duration))
      progressTimerRef.current = requestAnimationFrame(tick)
    }

    progressTimerRef.current = requestAnimationFrame(tick)
  }, [clip.duration])

  const stopProgressTimer = useCallback(() => {
    if (progressTimerRef.current !== null) {
      cancelAnimationFrame(progressTimerRef.current)
      progressTimerRef.current = null
    }
  }, [])

  /* ====== Playback Controls ====== */
  const play = useCallback(() => {
    setIsPlaying(true)
    speakSentence(activeIdxRef.current)
    startProgressTimer()
  }, [speakSentence, startProgressTimer])

  const pause = useCallback(() => {
    stopSpeaking()
    setIsPlaying(false)
    stopProgressTimer()
  }, [stopSpeaking, stopProgressTimer])

  const togglePlay = useCallback(() => {
    if (isPlayingRef.current) pause()
    else play()
  }, [play, pause])

  const seekToIndex = useCallback((index: number) => {
    stopSpeaking()
    stopProgressTimer()
    const idx = Math.max(0, Math.min(index, clip.sentences.length - 1))
    activeIdxRef.current = idx
    setActiveIndex(idx)
    const t = clip.sentences[idx].startTime
    resumeTimeRef.current = t
    setDisplayTime(t)
    setIsPlaying(false)
  }, [stopSpeaking, stopProgressTimer, clip])

  const replayCurrent = useCallback(() => {
    const idx = activeIdxRef.current
    stopSpeaking()
    stopProgressTimer()
    const t = clip.sentences[idx].startTime
    resumeTimeRef.current = t
    setDisplayTime(t)
    setIsPlaying(true)
    speakSentence(idx)
    startProgressTimer()
  }, [stopSpeaking, stopProgressTimer, speakSentence, startProgressTimer, clip])

  const changeSpeed = useCallback((s: number) => {
    setSpeed(s)
    speedRef.current = s
    if (isPlayingRef.current) {
      stopSpeaking()
      speakSentence(activeIdxRef.current)
    }
  }, [speakSentence, stopSpeaking])

  /* Cleanup */
  useEffect(() => {
    return () => {
      stopSpeaking()
      stopProgressTimer()
    }
  }, [stopSpeaking, stopProgressTimer])

  /* ====== Seek Slider ====== */
  const sliderRef = useRef<HTMLDivElement>(null)

  const getTimeFromEvent = useCallback((clientX: number) => {
    if (!sliderRef.current) return 0
    const rect = sliderRef.current.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    return ratio * clip.duration
  }, [clip.duration])

  const handleSliderMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    const t = getTimeFromEvent(e.clientX)
    setDragTime(t)
  }, [getTimeFromEvent])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const t = getTimeFromEvent(e.clientX)
      setDragTime(t)
    }

    const handleMouseUp = (e: MouseEvent) => {
      const t = getTimeFromEvent(e.clientX)
      setIsDragging(false)
      const idx = findSentenceIndex(clip, t)
      seekToIndex(idx)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, getTimeFromEvent, clip, seekToIndex])

  /* Touch support for slider */
  useEffect(() => {
    if (!isDragging) return

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const t = getTimeFromEvent(e.touches[0].clientX)
      setDragTime(t)
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const t = getTimeFromEvent(e.changedTouches[0].clientX)
      setIsDragging(false)
      const idx = findSentenceIndex(clip, t)
      seekToIndex(idx)
    }

    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, getTimeFromEvent, clip, seekToIndex])

  /* ====== Progress display ====== */
  const progressTime = isDragging ? dragTime : displayTime
  const progressPct = (progressTime / clip.duration) * 100

  /* ====== Word selection ====== */
  const handleTranscriptMouseUp = useCallback(() => {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed || !sel.toString().trim()) return

    const text = sel.toString().trim()
    const word = text.split(/[\s,.'"]+/)[0]?.toLowerCase()
    if (!word) return

    const range = sel.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const container = containerRef.current
    if (!container) return
    const containerRect = container.getBoundingClientRect()

    const dict = clip.vocab
    setWordPopup({
      word,
      definition: dict[word] || '未收录，可在生词本中自行添加',
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.bottom - containerRect.top + 6,
    })
  }, [clip])

  const handleContainerMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (wordPopup && !(e.target as HTMLElement).closest('.word-popup')) {
        setWordPopup(null)
      }
    },
    [wordPopup],
  )

  const addToVocab = useCallback(() => {
    if (!wordPopup) return
    if (!vocabWords.includes(wordPopup.word)) {
      setVocabWords((prev) => [...prev, wordPopup.word])
    }
    setWordPopup(null)
  }, [wordPopup, vocabWords])

  /* ====== Auto-scroll to current sentence ====== */
  const currentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [activeIndex])

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-56 h-56 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ====== Top Bar ====== */}
      <header className="relative z-10 px-4 pt-4 pb-2 flex items-center justify-between text-white">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white/60">精听练习</span>
          <span className="text-xs text-white/20">•</span>
          <span className="text-sm text-white/80 font-semibold">{clip.title}</span>
        </div>
        <div className="w-10" />
      </header>

      {/* Movie source badge */}
      <div className="relative z-10 mx-4 mb-2 text-center">
        <span className="text-xs text-indigo-400/70 bg-indigo-500/10 px-3 py-1 rounded-full">
          选自《{clip.source}》
        </span>
      </div>

      {/* ====== Seek Slider ====== */}
      <div className="relative z-10 mx-4 mt-2">
        <div
          ref={sliderRef}
          className="relative h-6 flex items-center cursor-pointer group"
          onMouseDown={handleSliderMouseDown}
        >
          {/* Track background */}
          <div className="absolute left-0 right-0 h-1.5 bg-white/10 rounded-full overflow-hidden">
            {/* Filled portion */}
            <div
              className="h-full bg-gradient-to-r from-indigo-400 to-indigo-300 rounded-full transition-[width] duration-75"
              style={{ width: `${Math.min(progressPct, 100)}%` }}
            />
          </div>
          {/* Thumb */}
          <div
            className="absolute w-4 h-4 bg-white rounded-full shadow-lg shadow-indigo-500/40 -translate-x-1/2 transition-transform hover:scale-110 group-hover:scale-110"
            style={{ left: `${Math.min(progressPct, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-white/40 mt-1">
          <span>{formatTime(progressTime)}</span>
          <span className="text-indigo-400/60">{formatTime(clip.duration)}</span>
        </div>
      </div>

      {/* ====== Transcript (sentence-by-sentence reveal) ====== */}
      <div
        ref={containerRef}
        className="relative z-10 flex-1 overflow-y-auto px-5 py-4 select-text"
        onMouseUp={handleTranscriptMouseUp}
        onMouseDown={handleContainerMouseDown}
      >
        <div className="space-y-4 max-w-lg mx-auto">
          {clip.sentences.map((s, i) => {
            /* Future sentences: completely hidden */
            if (i > activeIndex) return null

            const isPast = i < activeIndex
            const isCurrent = i === activeIndex

            return (
              <div
                key={i}
                ref={isCurrent ? currentRef : undefined}
                onClick={() => isPast && seekToIndex(i)}
                className={`transition-all duration-300 ${
                  isCurrent
                    ? ''
                    : isPast
                      ? 'opacity-40 hover:opacity-60 cursor-pointer'
                      : ''
                }`}
              >
                {/* Waveform animation for current sentence */}
                {isCurrent && (
                  <div className="flex items-center gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((b) => (
                      <div
                        key={b}
                        className="w-0.5 bg-indigo-400 rounded-full animate-pulse"
                        style={{
                          height: `${10 + b * 4}px`,
                          animationDelay: `${b * 0.15}s`,
                          animationDuration: '0.6s',
                        }}
                      />
                    ))}
                  </div>
                )}

                <p
                  className={`leading-relaxed select-text ${
                    isCurrent
                      ? 'text-xl font-bold text-white'
                      : 'text-base text-slate-400'
                  }`}
                >
                  {s.english}
                </p>

                {showTranslation && (
                  <p
                    className={`mt-0.5 select-text text-sm ${
                      isCurrent ? 'text-indigo-300/90' : 'text-slate-500/70'
                    }`}
                  >
                    {s.chinese}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Empty state hint when nothing has been played yet */}
        {activeIndex === 0 && displayTime === 0 && !isPlaying && (
          <div className="text-center text-white/20 text-sm mt-16">
            <p>点击播放按钮开始听力</p>
            <p className="mt-1">每句将逐一向你展示</p>
          </div>
        )}

        {/* "All done" hint when completed */}
        {activeIndex >= clip.sentences.length - 1 &&
          displayTime >= clip.sentences[clip.sentences.length - 1].endTime - 0.5 && (
            <div className="text-center text-emerald-400/60 text-sm mt-6 font-medium">
              听力完成 ✓
            </div>
          )}

        <div className="h-4" />
      </div>

      {/* ====== Word Popup ====== */}
      {wordPopup && (
        <div
          className="word-popup absolute z-50 bg-slate-800 border border-slate-600/50 rounded-xl shadow-2xl p-3 max-w-[260px]"
          style={{
            left: Math.max(16, Math.min(wordPopup.x - 100, 480 - 260 - 16)),
            top: wordPopup.y,
          }}
        >
          <p className="text-sm font-bold text-white">{wordPopup.word}</p>
          <p className="text-xs text-slate-400 mt-0.5">{wordPopup.definition}</p>
          <button
            onClick={addToVocab}
            disabled={vocabWords.includes(wordPopup.word)}
            className={`mt-2 w-full py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              vocabWords.includes(wordPopup.word)
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30'
            }`}
          >
            {vocabWords.includes(wordPopup.word) ? '✓ 已加入生词本' : '+ 加入生词本'}
          </button>
        </div>
      )}

      {/* ====== Bottom Controls ====== */}
      <div className="relative z-10 bg-white/5 backdrop-blur-xl border-t border-white/10 px-4 pt-4 pb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => changeSpeed(s)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                speed === s
                  ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/40'
                  : 'text-white/40 hover:text-white/70 border border-transparent'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={replayCurrent}
            className="w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <ReplayIcon />
          </button>

          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 shadow-lg shadow-indigo-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button
            onClick={() => setShowTranslation((v) => !v)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              showTranslation
                ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-400/30'
                : 'text-white/40 border border-white/10 hover:text-white/60'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            {showTranslation ? '中文' : 'EN'}
          </button>

          {/* Complete button */}
          {!completedRef.current && (
            <button
              onClick={() => { stopSpeaking(); stopProgressTimer(); setIsPlaying(false); completeListening(); }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              完成
            </button>
          )}
        </div>
      </div>

      {/* Vocab badge */}
      {vocabWords.length > 0 && (
        <div className="absolute top-4 right-16 z-20">
          <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-full px-2.5 py-1 text-xs text-emerald-300 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            </svg>
            {vocabWords.length}
          </div>
        </div>
      )}
    </div>
  )
}
