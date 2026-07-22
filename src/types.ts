/* ========== 单词 ========== */
export interface Word {
  word: string
  phonetic: string
  meaning: string
  root: string
  examples?: { en: string; zh: string }[]
  collocations?: string[]
  movieExample?: string
}

/* ========== 完成的学习会话 ========== */
export interface CompletedWordSession {
  id: string
  date: string          // ISO date string
  words: Word[]         // 该会话学过的全部单词
  knownCount: number    // 点击"认识"的数量
  forgotCount: number   // 点击"不认识"的数量
  totalCount: number
}

export interface CompletedListening {
  id: string
  date: string
  title: string
  transcript: { english: string; chinese: string }[]
}

/* ========== 用户账号 ========== */
export interface StoredUser {
  username: string
  passwordHash: string   // demo 级别，base64 编码
}

/* ========== 电影听力 ========== */
export interface MovieSentence {
  english: string
  chinese: string
  startTime: number
  endTime: number
}

export interface MovieClip {
  id: string
  title: string
  source: string
  sentences: MovieSentence[]
  duration: number
  vocab: Record<string, string>
}

/* ========== 错词本 ========== */
export interface WrongWord {
  word: string
  meaning: string
  date: string
}

/* ========== 页面路由 ========== */
export type TabPage = 'home' | 'listening' | 'vocab' | 'profile'
export type FullPage = 'word-learning' | 'listening-player' | 'word-review' | 'word-extra' | 'quiz-review' | 'wrong-words'
export type Page = TabPage | FullPage
