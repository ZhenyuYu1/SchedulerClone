import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import { UUID } from 'crypto'

export const runtime = 'edge'

export async function PUT(request: Request) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const body = await request.json()

  const { data, error } = await supabase
    .from('attendees')
    .update({ timesegments: body.timesegments })
    .eq('eventid', body.eventid)
    .eq('attendee', body.attendee)
    .select()

  if (error) {
    return NextResponse.json({
      status: 400,
      message: 'Error fetching attendees: ' + error,
    })
  }
  return NextResponse.json(data)
}
