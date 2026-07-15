'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Match } from '@/lib/types'
import { WORLD_CUP_FINAL_DATE } from '@/lib/utils'
import MatchCard from './MatchCard'

export default function MatchList() {
  const [matches, setMatches] = useState<Match[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await fetch('/api/matches')

      if (!res.ok) {
        setError(
          res.status === 429
            ? 'Too many requests - please wait a minute and try again.'
            : 'Something went wrong loading matches.'
        )
        return
      }

      setError(null)
      const data = await res.json()
      setMatches(data.matches)
    }

    fetchMatches()
    const interval = setInterval(fetchMatches, 30_000)
    return () => clearInterval(interval)
  }, [])

  if (error) {
    return <div className="text-center text-gray-400 p-4">{error}</div>
  }

  const today = new Date().toISOString().split('T')[0]
  const tournamentConcluded = today > WORLD_CUP_FINAL_DATE

  if (matches.length === 0 && tournamentConcluded) {
    return (
      <div className="flex flex-col items-center gap-3 text-center border border-wc-border bg-wc-surface rounded p-10">
        <span className="text-4xl">🏆</span>
        <div className="text-lg font-semibold">The 2026 FIFA World Cup has concluded</div>
        <p className="text-sm text-gray-400">Thanks for following along!</p>
        <Link
          href="/results"
          className="mt-2 text-sm font-medium tracking-widest uppercase text-yellow-400 hover:underline"
        >
          See the full results
        </Link>
      </div>
    )
  }

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 text-center border border-wc-border bg-wc-surface rounded p-10">
        <span className="text-4xl">⚽</span>
        <div className="text-lg font-semibold">No matches today</div>
        <p className="text-sm text-gray-400">Check back on the next match day.</p>
      </div>
    )
  }

  return (
    <div>
      {matches.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  )
}
