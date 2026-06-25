'use client'

import { useState, useEffect } from 'react'
import { Match } from '@/lib/types'
import MatchCard from './MatchCard'

export default function MatchList() {
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await fetch('/api/matches')
      const data = await res.json()
      setMatches(data.matches)
    }

    fetchMatches()
    const interval = setInterval(fetchMatches, 30_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      {matches.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  )
}
