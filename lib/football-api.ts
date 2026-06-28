import 'server-only'

const BASE_URL = 'https://api.football-data.org/v4'
const API_KEY = process.env.FOOTBALL_DATA_API_KEY

export async function footballFetch(path: string) {
  try {
    const response = await fetch(BASE_URL + path, {
      headers: { 'X-Auth-Token': API_KEY! },
    })
    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export async function getTodaysMatches() {
  const today = new Date().toISOString().split('T')[0]
  return footballFetch(`/competitions/WC/matches?dateFrom=${today}&dateTo=${today}`)
}
