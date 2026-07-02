import { footballFetch } from '@/lib/football-api'
import { Match } from '@/lib/types'
import { groupMatchesByDate } from '@/lib/utils'
import MatchCard from '@/components/MatchCard'

export default async function Results() {
  const result = await footballFetch<{ matches: Match[] }>('/competitions/WC/matches')

  if (!result.ok) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center text-gray-400">
        {result.status === 429
          ? 'Too many requests - please wait a minute and try again.'
          : 'Something went wrong loading results.'}
      </div>
    )
  }

  const matches: Match[] = result.data.matches
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
