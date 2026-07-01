import { footballFetch } from '@/lib/football-api'
import { Match } from '@/lib/types'
import { groupMatchesByDate } from '@/lib/utils'
import MatchCard from '@/components/MatchCard'

export default async function Results() {
  const data = await footballFetch('/competitions/WC/matches')
  const matches: Match[] = data.matches

  const groups = groupMatchesByDate(matches)

  return (
    <div className="max-w-2xl mx-auto p-4">
      {[...groups.entries()].map(([dateKey, dayMatches]) => (
        <div key={dateKey} className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-yellow-400 mb-2">
            {dateKey}
          </h2>
          <div>
            {dayMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
