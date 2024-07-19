'use client'
import { useState } from 'react'

import EventForm from '@/components/EventForm'
import Board from '@/components/Board'

export default function CreateEvent() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [earliestTime, setEarliestTime] = useState('')
  const [latestTime, setLatestTime] = useState('')
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([])
  const [timezone, setTimezone] = useState('')

  const handleSubmit = () => {
    console.log(`Title: ${title}`)
    console.log(`Description: ${description}`)
    console.log(`Location: ${location}`)
    console.log(`Earliest Time: ${earliestTime}`)
    console.log(`Latest Time: ${latestTime}`)
    console.log(`Days of Week: ${daysOfWeek}`)
    console.log(`Timezone: ${timezone}`)
  }

  return (
    <div //main screen
      className="flex min-h-screen w-full flex-col md:flex-row"
    >
      <section //Left side container
        className="h-full w-full p-10 md:w-2/5"
      >
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
          daysOfWeek={daysOfWeek}
          setDaysOfWeek={setDaysOfWeek}
          timezone={timezone}
          setTimezone={setTimezone}
          handleSubmit={handleSubmit}
        />
      </section>
      <section //Right side container
        className="w-full p-4 md:w-3/5 md:p-10"
      >
        <p>Right Panel</p>
      </section>
    </div>
  )
}
