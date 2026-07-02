import ScorersTable from '@/components/ScorersTable'
import { footballFetch } from '@/lib/football-api'
import { Scorer } from '@/lib/types'

export default async function Scorers() {
  const data = await footballFetch('/competitions/WC/scorers?limit=20')
  const scorers: Scorer[] = data.scorers

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ScorersTable scorers={scorers} />
    </div>
  )
}
