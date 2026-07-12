import { useState, useEffect, useCallback } from 'react'

const COLORS = ['#4f46e5', '#818cf8', '#f59e0b', '#22c55e', '#f43f5e', '#0ea5e9', '#8b5cf6', '#ec4899']

interface Piece {
  id: number
  left: number
  color: string
  width: number
  height: number
  delay: number
  duration: number
  drift: number
}

/* ====== Confetti Celebration ====== */
export default function Confetti({ trigger }: { trigger: boolean }) {
  const [pieces, setPieces] = useState<Piece[]>([])

  const generate = useCallback(() => {
    const arr: Piece[] = []
    for (let i = 0; i < 50; i++) {
      const size = 5 + Math.random() * 8
      arr.push({
        id: i,
        left: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        width: size,
        height: size * (0.4 + Math.random() * 0.6),
        delay: Math.random() * 1.5,
        duration: 2 + Math.random() * 2.5,
        drift: (Math.random() - 0.5) * 60,
      })
    }
    setPieces(arr)
  }, [])

  useEffect(() => {
    if (trigger) {
      generate()
      const timer = setTimeout(() => setPieces([]), 5000)
      return () => clearTimeout(timer)
    } else {
      setPieces([])
    }
  }, [trigger, generate])

  if (pieces.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.width,
            height: p.height,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
            marginLeft: p.drift,
            rotate: `${Math.random() * 360}deg`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  )
}
