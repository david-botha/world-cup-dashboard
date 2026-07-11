'use client'

import { useState } from 'react'
import { Match } from '@/lib/types'
import MatchCard from '@/components/MatchCard'

type Props = {
  // Each entry is one match day: a label plus the matches played that day.
  days: { dateKey: string; matches: Match[] }[]
}

export default function DayFlipper({ days }: Props) {
  const [dayIndex, setDayIndex] = useState(0)

  const current = days[dayIndex]
  const isFirstDay = dayIndex === 0
  const isLastDay = dayIndex === days.length - 1

  const formattedDate = new Date(current.dateKey).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setDayIndex(dayIndex - 1)}
          disabled={isFirstDay}
          className="px-3 py-1 text-sm rounded border border-wc-border transition hover:enabled:border-yellow-400 hover:enabled:scale-105 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          ← Prev
        </button>

        <h2 className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
          {formattedDate}
        </h2>

        <button
          onClick={() => setDayIndex(dayIndex + 1)}
          disabled={isLastDay}
          className="px-3 py-1 text-sm rounded border border-wc-border transition hover:enabled:border-yellow-400 hover:enabled:scale-105 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          Next →
        </button>
      </div>

      <div>
        {current.matches.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  )
}
