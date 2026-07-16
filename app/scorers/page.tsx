import ScorersTable from '@/components/ScorersTable'
import { footballFetch } from '@/lib/football-api'
import { Scorer } from '@/lib/types'
import ErrorState from '@/components/ErrorState'

export default async function Scorers() {
  const result = await footballFetch<{ scorers: Scorer[] }>('/competitions/WC/scorers?limit=20')

  if (!result.ok) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <ErrorState
          message={
            result.status === 429
              ? 'Too many requests - please wait a minute and try again.'
              : 'Something went wrong loading top scorers.'
          }
        />
      </div>
    )
  }

  const scorers: Scorer[] = result.data.scorers

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ScorersTable scorers={scorers} />
    </div>
  )
}
