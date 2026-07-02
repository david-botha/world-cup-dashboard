import { getTodaysMatches } from '@/lib/football-api'

export async function GET() {
  const result = await getTodaysMatches()

  if (!result.ok) {
    return Response.json({ error: true }, { status: result.status || 500 })
  }

  return Response.json(result.data)
}
