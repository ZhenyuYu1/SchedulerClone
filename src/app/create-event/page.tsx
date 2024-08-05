'use client'
import { useState } from 'react'
import { randomUUID, UUID } from 'crypto'
import { days, modeOptions } from '@/utils/dateUtils'
import { addUserCreateEvent } from '@/utils/userUtils'
import { insertEvent } from '@/utils/eventsUtils'

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

  const handleSubmit = () => {
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

    addUserCreateEvent(
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
    )
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
