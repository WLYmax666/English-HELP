import { useState, useMemo } from 'react'
import type { Word, WrongWord } from '../types'
import { WORD_BANK } from '../data/wordBank'

/* ========== 工具 ========== */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface Question {
  word: Word
  options: { text: string; correct: boolean }[]
}

function generateQuestions(count: number): Question[] {
  const picked = shuffle(WORD_BANK).slice(0, count)
  const allMeanings = WORD_BANK.map((w) => w.meaning)

  return picked.map((word) => {
    const others = allMeanings.filter((m) => m !== word.meaning)
    const distractors = shuffle(others).slice(0, 3)
    const options = shuffle([
      { text: word.meaning, correct: true },
      ...distractors.map((text) => ({ text, correct: false })),
    ])
    return { word, options }
  })
}

/* ========== Props ========== */
interface Props {
  onBack: () => void
  onComplete: () => void
  onWrongWord: (w: WrongWord) => void
}

/* ============================================ */
/*              QuizReview Page                */
/* ============================================ */
export default function QuizReview({ onBack, onComplete: _onComplete, onWrongWord }: Props) {
  const questions = useMemo(() => generateQuestions(10), [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongWords, setWrongWords] = useState<WrongWord[]>([])
  const [finished, setFinished] = useState(false)

  const q = questions[currentIndex]
  const total = questions.length
  const progress = currentIndex + 1

  const handleSelect = (idx: number) => {
    if (selectedIdx !== null) return // already answered

    setSelectedIdx(idx)
    const isCorrect = q.options[idx].correct
    setResult(isCorrect ? 'correct' : 'wrong')

    if (isCorrect) {
      setCorrectCount((c) => c + 1)
    } else {
      const ww: WrongWord = {
        word: q.word.word,
        meaning: q.word.meaning,
        date: new Date().toISOString().slice(0, 10),
      }
      setWrongWords((prev) => [...prev, ww])
      onWrongWord(ww)
    }

    // advance after 1.2s
    setTimeout(() => {
      if (currentIndex < total - 1) {
        setCurrentIndex((i) => i + 1)
        setSelectedIdx(null)
        setResult(null)
      } else {
        setFinished(true)
      }
    }, 1200)
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelectedIdx(null)
    setResult(null)
    setCorrectCount(0)
    setWrongWords([])
    setFinished(false)
  }

  /* ---------- Finish Screen ---------- */
  if (finished) {
    return (
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-200/30 to-transparent rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl pointer-events-none" />
        <div className="flex-1 flex flex-col items-center justify-center px-5">
          <span className="text-5xl mb-4">{correctCount === total ? '🏆' : correctCount >= total / 2 ? '👏' : '💪'}</span>
          <h1 className="text-2xl font-bold text-text">复习完成！</h1>
          <div className="mt-3 bg-white rounded-2xl border border-indigo-100/60 p-5 text-center shadow-sm">
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-400">
              {correctCount} / {total}
            </p>
            <p className="text-sm text-text-secondary mt-1">
              {correctCount === total ? '全部正确，太棒了！' : `正确率 ${Math.round((correctCount / total) * 100)}%`}
            </p>
          </div>

          {wrongWords.length > 0 && (
            <div className="mt-4 w-full max-w-sm">
              <p className="text-sm font-bold text-text mb-2">需要复习的单词：</p>
              <div className="bg-white rounded-2xl border border-rose-100/60 p-4 space-y-2">
                {wrongWords.map((w, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-semibold text-text text-sm">{w.word}</span>
                    <span className="text-xs text-text-secondary ml-2 text-right max-w-[200px] truncate">{w.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-white border border-indigo-100/60 text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 active:scale-95 transition-all cursor-pointer"
            >
              返回首页
            </button>
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              再来一组
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ---------- Quiz ---------- */
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-200/30 to-transparent rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-48 h-48 bg-gradient-to-tr from-amber-200/15 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Top Bar */}
      <header className="relative px-4 pt-4 pb-2 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/80 border border-indigo-100/60 shadow-sm hover:bg-white transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 bg-white/80 rounded-full pl-3 pr-3 py-1.5 border border-indigo-100/60 shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="text-sm font-bold text-indigo-600">{progress}/{total}</span>
          </div>
        </div>
        <div className="w-10" />
      </header>

      {/* Progress bar */}
      <div className="relative mx-4 mt-2 h-1.5 bg-indigo-100/70 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-500"
          style={{ width: `${(progress / total) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center px-5 pt-8">
        <div className="w-full max-w-sm">
          {/* Word display */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-text tracking-tight">{q.word.word}</h1>
            <p className="text-sm text-text-secondary/70 mt-1">{q.word.phonetic}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, i) => {
              let btnClass = 'bg-white border-indigo-100/60 text-text hover:bg-indigo-50 hover:border-indigo-200'

              if (selectedIdx !== null) {
                if (opt.correct) {
                  btnClass = 'bg-green-50 border-green-300 text-green-700'
                } else if (i === selectedIdx && !opt.correct) {
                  btnClass = 'bg-rose-50 border-rose-300 text-rose-700'
                } else {
                  btnClass = 'bg-white border-slate-100 text-text/40'
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full p-4 rounded-2xl border-2 text-sm font-medium text-left transition-all duration-200 cursor-pointer ${btnClass}`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold text-center leading-6 mr-3 shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt.text}
                </button>
              )
            })}
          </div>

          {/* Result feedback */}
          {result && (
            <div className={`mt-4 text-center py-3 rounded-2xl font-bold text-sm ${
              result === 'correct' ? 'bg-green-50 text-green-600' : 'bg-rose-50 text-rose-600'
            }`}>
              {result === 'correct' ? '✓ 正确！' : '✗ 不正确'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
