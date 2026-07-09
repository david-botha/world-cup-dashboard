import 'server-only'
import { Match } from '@/lib/types'

const BASE_URL = 'https://api.football-data.org/v4'
const API_KEY = process.env.FOOTBALL_DATA_API_KEY

type FootballApiResult<T> = { ok: true; data: T } | { ok: false; status: number }

export async function footballFetch<T>(path: string): Promise<FootballApiResult<T>> {
  try {
    const response = await fetch(BASE_URL + path, {
      headers: { 'X-Auth-Token': API_KEY! },
    })
    if (!response.ok) {
      return { ok: false, status: response.status }
    }

    const data = await response.json()

    return { ok: true, data }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { ok: false, status: 0 }
  }
}

export async function getTodaysMatches() {
  const today = new Date().toISOString().split('T')[0]
  return footballFetch<{ matches: Match[] }>(
    `/competitions/WC/matches?dateFrom=${today}&dateTo=${today}`
  )
}

export async function getKnockoutMatches() {
  const result = await footballFetch<{ matches: Match[] }>('/competitions/WC/matches')

  if (!result.ok) {
    return result
  }

  return {
    ok: true as const,
    data: {
      matches: result.data.matches.filter(match => match.stage !== 'GROUP_STAGE'),
    },
  }
}
