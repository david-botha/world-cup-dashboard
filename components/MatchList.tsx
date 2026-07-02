'use client'

import { useState, useEffect } from 'react'
import { Match } from '@/lib/types'
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

  return (
    <div>
      {matches.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  )
}
