import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Match } from '@/lib/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function groupMatchesByDate(matches: Match[]) {
  const groups = new Map<string, Match[]>()

  for (const match of matches) {
    const key = toEasternTime(match.utcDate)
    if (!groups.has(key)) {
      groups.set(key, [])
    }

    groups.get(key)!.push(match)
  }

  return groups
}

export const WORLD_CUP_FINAL_DATE = '2026-07-19'

export const KNOCKOUT_STAGE_ORDER = ['LAST_32', 'LAST_16', 'QUARTER_FINALS', 'SEMI_FINALS', 'FINAL']

export const KNOCKOUT_STAGE_LABELS: Record<string, string> = {
  LAST_32: 'Round of 32',
  LAST_16: 'Round of 16',
  QUARTER_FINALS: 'Quarterfinals',
  SEMI_FINALS: 'Semifinals',
  FINAL: 'Final',
}

// Determined by FIFA's official draw
const LAST_32_BRACKET_ORDER = [
  ['Germany', 'Paraguay'],
  ['France', 'Sweden'],
  ['South Africa', 'Canada'],
  ['Netherlands', 'Morocco'],
  ['Portugal', 'Croatia'],
  ['Spain', 'Austria'],
  ['United States', 'Bosnia-Herzegovina'],
  ['Belgium', 'Senegal'],
  ['Brazil', 'Japan'],
  ['Ivory Coast', 'Norway'],
  ['Mexico', 'Ecuador'],
  ['England', 'Congo DR'],
  ['Argentina', 'Cape Verde Islands'],
  ['Australia', 'Egypt'],
  ['Switzerland', 'Algeria'],
  ['Colombia', 'Ghana'],
]

export function groupMatchesByStage(matches: Match[]) {
  const groups = new Map<string, Match[]>()

  for (const match of matches) {
    const key = match.stage
    if (!groups.has(key)) {
      groups.set(key, [])
    }

    groups.get(key)!.push(match)
  }

  /*
  Sort each round's matches into top-to-bottom bracket order.
  Number all 32 teams 0-31 straight down the draw. A match's position
  in its round = either team's previous position divided by 2, because
  each pair of neighbouring matches feeds into one match on the right.
  */

  let teamSlots = new Map<string, number>(
    LAST_32_BRACKET_ORDER.flatMap(([home, away], match): [string, number][] => [
      [home, match * 2],
      [away, match * 2 + 1],
    ])
  )

  for (const stage of KNOCKOUT_STAGE_ORDER) {
    const stageMatches = groups.get(stage)
    if (!stageMatches) continue

    const withSlots = stageMatches.map(match => {
      const homeSlot = teamSlots.get(match.homeTeam.name)
      const awaySlot = teamSlots.get(match.awayTeam.name)
      const slot = Math.floor((homeSlot ?? awaySlot ?? 0) / 2)
      return { match, slot }
    })

    withSlots.sort((a, b) => a.slot - b.slot)
    groups.set(
      stage,
      withSlots.map(({ match }) => match)
    )

    teamSlots = new Map(
      withSlots.flatMap(({ match, slot }) => [
        [match.homeTeam.name, slot],
        [match.awayTeam.name, slot],
      ])
    )
  }

  return groups
}

// UTC and SAST 'split' a match day since games are played on either side of midnight
function toEasternTime(utcDate: string) {
  const universalTime = new Date(utcDate)
  const easternTime = universalTime.toLocaleDateString('en-US', { timeZone: 'America/New_York' })

  return easternTime
}
