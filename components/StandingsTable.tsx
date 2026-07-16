import { Group, TeamStanding } from '@/lib/types'

export default function StandingsTable({ group }: { group: Group }) {
  const groupLabel = group.group.replace('GROUP_', 'Group ')

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-2 text-white">{groupLabel}</h2>
      <div className="border border-wc-border rounded overflow-hidden">
        <table className="w-full text-sm tabular-nums">
          <thead className="border-b border-wc-border text-gray-400">
            <tr>
              <th className="text-left py-1 w-8 pl-3 pr-3">Pos</th>
              <th className="text-left py-1">Team</th>
              <th className="text-right py-1 w-8">P</th>
              <th className="text-right py-1 w-8">W</th>
              <th className="text-right py-1 w-8">D</th>
              <th className="text-right py-1 w-8">L</th>
              <th className="text-right py-1 w-10 hidden sm:table-cell">GF</th>
              <th className="text-right py-1 w-10 hidden sm:table-cell">GA</th>
              <th className="text-right py-1 w-10">GD</th>
              <th className="text-right py-1 w-10 pr-3 font-bold text-white">Pts</th>
            </tr>
          </thead>
          <tbody>
            {group.table.map((row: TeamStanding) => (
              <tr key={row.team.name} className="border-b border-wc-border even:bg-wc-surface">
                <td className="text-left py-2 pl-3">{row.position}</td>
                <td className="text-left py-2">
                  <span className="inline-flex items-center gap-2">
                    <img src={row.team.crest} alt={row.team.name} width={20} height={20} />
                    {row.team.name}
                  </span>
                </td>
                <td className="text-right py-2">{row.playedGames}</td>
                <td className="text-right py-2">{row.won}</td>
                <td className="text-right py-2">{row.draw}</td>
                <td className="text-right py-2">{row.lost}</td>
                <td className="text-right py-2 hidden sm:table-cell">{row.goalsFor}</td>
                <td className="text-right py-2 hidden sm:table-cell">{row.goalsAgainst}</td>
                <td className="text-right py-2">{row.goalDifference}</td>
                <td className="text-right py-2 pr-3 font-bold">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
