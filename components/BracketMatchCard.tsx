import { Match } from '@/lib/types'

export default function BracketMatchCard({ match }: { match: Match }) {
  const score = ['IN_PLAY', 'LIVE', 'FINISHED', 'PAUSED'].includes(match.status)
    ? match.score
    : null

  return (
    <div className="w-48 rounded border border-wc-border bg-wc-surface text-sm">
      <TeamRow
        name={match.homeTeam.name}
        crest={match.homeTeam.crest}
        score={score?.fullTime.home}
      />
      <div className="border-t border-wc-border" />
      <TeamRow
        name={match.awayTeam.name}
        crest={match.awayTeam.crest}
        score={score?.fullTime.away}
      />
    </div>
  )
}

function TeamRow({
  name,
  crest,
  score,
}: {
  name: string
  crest: string
  score: number | null | undefined
}) {
  return (
    <div className="flex items-center gap-2 px-2 py-1">
      <img src={crest} alt={name} width={20} height={20} />
      <div className="flex-1 truncate">{name}</div>
      <div className="w-4 text-right text-gray-400">{score ?? ''}</div>
    </div>
  )
}
