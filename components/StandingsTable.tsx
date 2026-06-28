import { Group, TeamStanding } from '@/lib/types'

export default function StandingsTable({ group }: { group: Group }) {
  const groupLabel = group.group.replace('GROUP_', 'Group ')

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-2">{groupLabel}</h2>
      <table className="w-full text-sm">
        <thead className="border-b text-gray-500">
          <tr>
            <th className="text-left py-1 pr-2 w-8">Pos</th>
            <th className="text-left py-1 pr-4">Team</th>
            <th className="text-right py-1 px-2">P</th>
            <th className="text-right py-1 px-2">W</th>
            <th className="text-right py-1 px-2">D</th>
            <th className="text-right py-1 px-2">L</th>
            <th className="text-right py-1 px-2">GF</th>
            <th className="text-right py-1 px-2">GA</th>
            <th className="text-right py-1 px-2">GD</th>
            <th className="text-right py-1 pl-2 font-bold text-black">Pts</th>
          </tr>
        </thead>
        <tbody>
          {group.table.map((row: TeamStanding) => (
            <tr key={row.team.name} className="border-b even:bg-gray-100">
              <td className="text-left py-2 pr-2">{row.position}</td>
              <td className="text-left py-2 pr-4">
                <span className="inline-flex items-center gap-2">
                  <img src={row.team.crest} alt={row.team.name} width={20} height={20} />
                  {row.team.name}
                </span>
              </td>
              <td className="text-right py-2 px-2">{row.playedGames}</td>
              <td className="text-right py-2 px-2">{row.won}</td>
              <td className="text-right py-2 px-2">{row.draw}</td>
              <td className="text-right py-2 px-2">{row.lost}</td>
              <td className="text-right py-2 px-2">{row.goalsFor}</td>
              <td className="text-right py-2 px-2">{row.goalsAgainst}</td>
              <td className="text-right py-2 px-2">{row.goalDifference}</td>
              <td className="text-right py-2 pl-2 font-bold">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
