'use client'

import { useState } from 'react'
import { UUID } from 'crypto'
import { useRouter } from 'next/navigation'
import { days, modeOptions } from '@/utils/dateUtils'
import EventForm from '@/components/EventForm'

export default function CreateEvent() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [earliestTime, setEarliestTime] = useState('')
  const [latestTime, setLatestTime] = useState('')
  const [mode, setMode] = useState('')
  const [config, setConfig] = useState<JSON | null>(null)
  const [daysOfWeek, setDaysOfWeek] = useState<string[] | null>([])
  const [timezone, setTimezone] = useState('')

  const router = useRouter()

  const insertEvent = async (
    title: string,
    description: string,
    starttime: string,
    endtime: string,
    location: string,
    timezone: string,
    mode: string,
    config: JSON,
    creator: UUID,
  ) => {
    const response = await fetch('/api/events/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        starttime: starttime,
        endtime: endtime,
        location: location,
        timezone: timezone,
        mode: mode,
        config: config,
        creator: creator,
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.message)
    }

    return response.json() // Returns the JSON response including the eventId
  }

  const handleSubmit = async () => {
    console.log(`Title: ${title}`)
    console.log(`Description: ${description}`)
    console.log(`Location: ${location}`)
    console.log(`Earliest Time: ${earliestTime}`)
    console.log(`Latest Time: ${latestTime}`)
    console.log(`Mode: ${mode}`)
    console.log(`DaysOfWeek: ${daysOfWeek}`)
    console.log(`Timezone: ${timezone}`)

    const daysOfWeekJSON: { [key: string]: boolean } = {
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
      Sun: false,
    }

    if (daysOfWeek) {
      daysOfWeek.forEach((day) => {
        if (daysOfWeekJSON.hasOwnProperty(day)) {
          daysOfWeekJSON[day] = true
        }
      })
    }

    try {
      const data = await insertEvent(
        title,
        description,
        earliestTime,
        latestTime,
        location,
        timezone,
        mode,
        mode === 'weekly'
          ? daysOfWeekJSON
          : JSON.parse('{"days": ["2024-01-01"]}'), // filler for specific mode now because no calendar yet
        '9e33186f-95db-4385-a974-ee38c8e07547', // userId placeholder
      )

      router.push(`/view-event?eventId=${data[0].id}`) // Redirects to the event view page using the eventId
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message)
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }

  return (
    <EventForm
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      location={location}
      setLocation={setLocation}
      earliestTime={earliestTime}
      setEarliestTime={setEarliestTime}
      latestTime={latestTime}
      setLatestTime={setLatestTime}
      mode={mode}
      setMode={setMode}
      daysOfWeek={daysOfWeek}
      setDaysOfWeek={setDaysOfWeek}
      timezone={timezone}
      setTimezone={setTimezone}
      handleSubmit={handleSubmit}
    />
  )
}
