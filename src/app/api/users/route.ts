import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'

export async function GET() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase.from('Users').select()

  if (error) {
    return NextResponse.json({ message: 'Error fetching users' })
  }
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const body = await request.json()
  const { data, error } = await supabase.from('Users').insert([body]).select()

  if (error) {
    return NextResponse.json({ message: 'Error inserting user' })
  }
  return NextResponse.json(data)
}
