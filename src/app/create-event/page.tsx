'use client'
import { useState } from 'react'

import EventForm from '@/components/EventForm'

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
  )
}
