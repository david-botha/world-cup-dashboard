import MatchCard from '@/components/MatchCard'
import { Match } from '@/lib/types'
import { getTodaysMatches } from '@/lib/football-api'

export default async function Home() {
  const { matches } = await getTodaysMatches()

  return (
    <div className="max-w-2xl mx-auto p-4">
      {matches.map((match: Match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  )
}
