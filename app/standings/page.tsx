import { footballFetch } from '@/lib/football-api'
import { Group } from '@/lib/types'
import StandingsTable from '@/components/StandingsTable'

export default async function Standings() {
  const result = await footballFetch<{ standings: Group[] }>('/competitions/WC/standings')

  if (!result.ok) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center text-gray-400">
        {result.status === 429
          ? 'Too many requests - please wait a minute and try again.'
          : 'Something went wrong loading standings.'}
      </div>
    )
  }

  const standings: Group[] = result.data.standings

  return (
    <div className="max-w-2xl mx-auto p-4">
      {standings.map(group => (
        <StandingsTable key={group.group} group={group} />
      ))}
    </div>
  )
}
