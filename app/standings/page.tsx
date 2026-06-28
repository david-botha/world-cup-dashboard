import { footballFetch } from '@/lib/football-api'
import { Group } from '@/lib/types'
import StandingsTable from '@/components/StandingsTable'

export default async function Standings() {
  const data = await footballFetch('/competitions/WC/standings')
  const standings: Group[] = data.standings

  return (
    <div className="max-w-2xl mx-auto p-4">
      {standings.map(group => (
        <StandingsTable key={group.group} group={group} />
      ))}
    </div>
  )
}
