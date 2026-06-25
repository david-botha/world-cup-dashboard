import { getTodaysMatches } from '@/lib/football-api'

export async function GET() {
  const data = await getTodaysMatches()
  return Response.json(data)
}
