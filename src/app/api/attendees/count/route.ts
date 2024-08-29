import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

export const runtime = 'edge'

export async function GET(request: Request) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const url = new URL(request.url)
  const eventid = url.searchParams.get('eventid')

  const { count, error } = await supabase
    .from('attendees')
    .select('*', { count: 'exact', head: true })
    .eq('eventid', eventid)

  if (error) {
    return NextResponse.json({
      status: 400,
      message: 'Error fetching attendees: ' + error,
    })
  }
  return NextResponse.json(count)
}
