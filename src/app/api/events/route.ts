import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

export async function GET() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase.from('Events').select()

  if (error) {
    return NextResponse.json({ message: 'Error fetching events' })
  }
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const body = await request.json()
  const { data, error } = await supabase.from('Events').insert([body]).select()

  if (error) {
    return NextResponse.json({ message: 'Error inserting event' })
  }
  return NextResponse.json(data)
}
