import { getKnockoutMatches } from '@/lib/football-api'
import KnockoutBracket from '@/components/KnockoutBracket'

export default async function Knockouts() {
  const result = await getKnockoutMatches()

  if (!result.ok) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center text-gray-400">
        {result.status === 429
          ? 'Too many requests - please wait a minute and try again.'
          : 'Something went wrong loading the knockout bracket.'}
      </div>
    )
  }

  return <KnockoutBracket matches={result.data.matches} />
}
