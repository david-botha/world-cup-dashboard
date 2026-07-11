import { footballFetch } from '@/lib/football-api'
import { Match } from '@/lib/types'
import { groupMatchesByDate } from '@/lib/utils'
import DayFlipper from '@/components/DayFlipper'

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
  const days = [...groups.entries()].map(([dateKey, matches]) => ({ dateKey, matches }))

  return (
    <div className="max-w-2xl mx-auto p-4">
      <DayFlipper days={days} />
    </div>
  )
}
