import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import { UUID } from 'crypto'

export async function GET(request: Request) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const url = new URL(request.url)
  const creatorId = url.searchParams.get('creatorId')

  const { data, error } = await supabase
    .from('events')
    .select()
    .eq('creator', creatorId)

  if (error) {
    return NextResponse.json({
      status: 400,
      message: 'Error fetching events',
    })
  }
  return NextResponse.json(data)
}
