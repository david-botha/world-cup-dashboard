import { Scorer } from '@/lib/types'

export default function ScorersTable({ scorers }: { scorers: Scorer[] }) {
  return (
    <div className="mb-8">
      <div className="border border-wc-border rounded overflow-hidden">
        <table className="w-full text-sm tabular-nums">
          <thead className="border-b border-wc-border text-gray-400">
            <tr>
              <th className="text-left py-1 w-10 pl-3 pr-3"></th>
              <th className="text-left py-1 pr-3">Player</th>
              <th className="text-left py-1 pr-3">Team</th>
              <th className="text-right py-1 w-16 pr-3">Goals</th>
            </tr>
          </thead>
          <tbody>
            {scorers.map((scorer: Scorer, index: number) => (
              <tr key={scorer.player.id} className="border-b border-wc-border even:bg-wc-surface">
                <td className="text-left py-2 pl-3">{index + 1}</td>
                <td className="text-left py-2 pr-3">{scorer.player.name}</td>
                <td className="text-left py-2 pr-3">
                  <span className="inline-flex items-center gap-2">
                    <img src={scorer.team.crest} alt={scorer.team.name} width={20} height={20} />
                    <span className="text-gray-400">{scorer.team.name}</span>
                  </span>
                </td>
                <td className="text-right py-2 pr-3 font-bold">{scorer.goals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
