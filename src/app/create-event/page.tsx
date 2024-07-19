'use client'
import { useState } from 'react'
import { UUID } from 'crypto'

import EventForm from '@/components/EventForm'

export default function CreateEvent() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [earliestTime, setEarliestTime] = useState('')
  const [latestTime, setLatestTime] = useState('')
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([])
  const [timezone, setTimezone] = useState('')

  const insertEvent = (
    title: string,
    description: string,
    startTime: string,
    endTime: string,
    location: string,
    timezone: string,
    mode: string,
    config: JSON,
    creator: UUID,
  ) => {
    fetch('/api/events/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        startTime: startTime,
        endTime: endTime,
        location: location,
        timezone: timezone,
        mode: mode,
        config: config,
        creator: creator,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message)
          })
        }
        return response.json()
      })
      .then((data) => {
        console.log('Success:', data)
      })
      .catch((error) => {
        console.error('Error:', error.message)
      })
  }

  const handleSubmit = () => {
    console.log(`Title: ${title}`)
    console.log(`Description: ${description}`)
    console.log(`Location: ${location}`)
    console.log(`Earliest Time: ${earliestTime}`)
    console.log(`Latest Time: ${latestTime}`)
    console.log(`Days of Week: ${daysOfWeek}`)
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

    if (daysOfWeek.length > 0) {
      daysOfWeek.forEach((day) => {
        if (daysOfWeekJSON.hasOwnProperty(day)) {
          daysOfWeekJSON[day] = true
        }
      })
    }

    insertEvent(
      title,
      description,
      earliestTime,
      latestTime,
      location,
      timezone,
      daysOfWeek.length > 0 ? 'weekly' : 'specific',
      daysOfWeek.length > 0
        ? daysOfWeekJSON
        : JSON.parse('{"days": ["2024-01-01"]}'),
      '9e33186f-95db-4385-a974-ee38c8e07547',
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
      daysOfWeek={daysOfWeek}
      setDaysOfWeek={setDaysOfWeek}
      timezone={timezone}
      setTimezone={setTimezone}
      handleSubmit={handleSubmit}
    />
  )
}
