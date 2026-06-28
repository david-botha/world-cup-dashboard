import { Match } from '@/lib/types'

export default function MatchCard({ match }: { match: Match }) {
  const homeTeam = match.homeTeam
  const awayTeam = match.awayTeam

  const score = ['IN_PLAY', 'LIVE', 'FINISHED', 'PAUSED'].includes(match.status)
    ? match.score
    : null

  const kickoffTime = new Date(match.utcDate).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="flex items-center w-full py-2">
      <div className="flex-1 flex items-center justify-end gap-2">
        <div className="text-right">{homeTeam.name}</div>
        <img src={homeTeam.crest} alt={homeTeam.name} width={32} height={32} />
      </div>

      <div className="w-24 text-center">
        {score ? (
          <>
            <div>
              {score.fullTime.home} - {score.fullTime.away}
            </div>
            <div className="text-sm text-gray-500">
              {match.status === 'PAUSED' && 'HT'}
              {match.status === 'FINISHED' && 'FT'}
              {(match.status === 'IN_PLAY' || match.status === 'LIVE') && (
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
              )}
            </div>
          </>
        ) : (
          kickoffTime
        )}
      </div>

      <div className="flex-1 flex items-center gap-2">
        <img src={awayTeam.crest} alt={awayTeam.name} width={32} height={32} />
        <div>{awayTeam.name}</div>
      </div>
    </div>
  )
}
