export type Match = {
  id: number
  status: string
  utcDate: string
  homeTeam: { name: string; crest: string }
  awayTeam: { name: string; crest: string }
  score: {
    fullTime: { home: number | null; away: number | null }
  }
}

export type TeamStanding = {
  position: number
  team: { name: string; crest: string }
  playedGames: number
  won: number
  draw: number
  lost: number
  points: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
}

export type Group = {
  group: string
  table: TeamStanding[]
}
