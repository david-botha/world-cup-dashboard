import { Match } from '@/lib/types'
import { groupMatchesByStage, KNOCKOUT_STAGE_ORDER, KNOCKOUT_STAGE_LABELS } from '@/lib/utils'
import BracketMatchCard from '@/components/BracketMatchCard'

const TOTAL_ROWS = 16

export default function KnockoutBracket({ matches }: { matches: Match[] }) {
  const grouped = groupMatchesByStage(matches)
  const stages = KNOCKOUT_STAGE_ORDER.filter(stage => grouped.has(stage))

  return (
    <div className="flex gap-8 overflow-x-auto p-4">
      {stages.map(stage => {
        const stageMatches = grouped.get(stage)!
        const rowsPerMatch = TOTAL_ROWS / stageMatches.length

        return (
          <div key={stage} className="w-48">
            <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-yellow-400">
              {KNOCKOUT_STAGE_LABELS[stage]}
            </h2>
            <div className="grid h-320" style={{ gridTemplateRows: `repeat(${TOTAL_ROWS}, 1fr)` }}>
              {stageMatches.map((match, i) => (
                <div
                  key={match.id}
                  className="flex items-center"
                  style={{ gridRow: `${i * rowsPerMatch + 1} / span ${rowsPerMatch}` }}
                >
                  <BracketMatchCard match={match} />
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
