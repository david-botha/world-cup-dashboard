import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Match } from '@/lib/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function groupMatchesByDate(matches: Match[]) {
  const groups = new Map<string, Match[]>()

  for (const match of matches) {
    const key = toEasternTime(match.utcDate)
    if (!groups.has(key)) {
      groups.set(key, [])
    }

    groups.get(key)!.push(match)
  }

  return groups
}

// UTC and SAST 'split' a match day since games are played on either side of midnight
function toEasternTime(utcDate: string) {
  const universalTime = new Date(utcDate)
  const easternTime = universalTime.toLocaleDateString('en-US', { timeZone: 'America/New_York' })

  return easternTime
}
