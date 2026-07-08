import type { StoredUser } from '../types'

const USERS_KEY = 'english_app_users'
const CURRENT_USER_KEY = 'english_app_current_user'

/* Demo 级别编码——非安全哈希，仅用于避免明文存储 */
function encodePassword(pw: string): string {
  return btoa(pw)
}

export function getUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function registerUser(
  username: string,
  password: string,
): { ok: true } | { ok: false; error: string } {
  const u = username.trim()
  const p = password.trim()
  if (!u || !p) return { ok: false, error: '用户名和密码不能为空' }
  if (u.includes('_')) return { ok: false, error: '用户名不能包含下划线' }
  if (u.length > 20) return { ok: false, error: '用户名最多 20 个字符' }

  const users = getUsers()
  if (users.some((x) => x.username === u)) {
    return { ok: false, error: '用户名已被占用' }
  }
  users.push({ username: u, passwordHash: encodePassword(p) })
  saveUsers(users)
  return { ok: true }
}

export function loginUser(
  username: string,
  password: string,
): { ok: true; username: string } | { ok: false; error: string } {
  const u = username.trim()
  const p = password.trim()
  if (!u || !p) return { ok: false, error: '用户名和密码不能为空' }

  const users = getUsers()
  const user = users.find((x) => x.username === u)
  if (!user || user.passwordHash !== encodePassword(p)) {
    return { ok: false, error: '用户名或密码错误' }
  }
  return { ok: true, username: u }
}

export function getCurrentUser(): string | null {
  try {
    return localStorage.getItem(CURRENT_USER_KEY)
  } catch {
    return null
  }
}

export function setCurrentUser(username: string | null): void {
  if (username) {
    localStorage.setItem(CURRENT_USER_KEY, username)
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}
