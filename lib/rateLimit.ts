// Simple in-memory rate limiter
// In production, replace with Redis (Upstash) for persistence across serverless instances

interface RateLimitEntry {
  count: number
  windowStart: number
  dayCount: number
  dayStart: number
}

const store = new Map<string, RateLimitEntry>()

const HOUR_MS = 60 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000
const MAX_PER_HOUR = 10
const MAX_PER_DAY = 30

export function checkRateLimit(ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry) {
    store.set(ip, { count: 1, windowStart: now, dayCount: 1, dayStart: now })
    return { allowed: true }
  }

  // Reset hourly window
  if (now - entry.windowStart > HOUR_MS) {
    entry.count = 0
    entry.windowStart = now
  }

  // Reset daily window
  if (now - entry.dayStart > DAY_MS) {
    entry.dayCount = 0
    entry.dayStart = now
  }

  if (entry.dayCount >= MAX_PER_DAY) {
    return { allowed: false, reason: `Daily limit reached (${MAX_PER_DAY} generations). Try again tomorrow.` }
  }

  if (entry.count >= MAX_PER_HOUR) {
    const resetIn = Math.ceil((entry.windowStart + HOUR_MS - now) / 60000)
    return { allowed: false, reason: `Hourly limit reached. Try again in ${resetIn} minute${resetIn === 1 ? "" : "s"}.` }
  }

  entry.count++
  entry.dayCount++
  store.set(ip, entry)
  return { allowed: true }
}
