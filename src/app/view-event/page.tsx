'use client'
import { UUID } from 'crypto'

import EventView from '@/components/EventView'
import { useEffect, useState } from 'react'
import EventCard from '@/components/EventCard'
import { useSearchParams } from 'next/navigation'

//const ViewEvent = ({ eventId: any }) => {
const ViewEvent = () => {
  const searchParams = useSearchParams()

  const eventId = searchParams.get('eventId')
  // State to hold the event URL
  const [eventUrl, setEventUrl] = useState('')
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    console.log('Event ID in URL is ' + eventId)
    const getTheEvent = async () => {
      fetch(`/api/events?eventId=${eventId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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
          console.log(data)
          setEvents(data)
        })
        .catch((error) => {
          console.error('Error:', error.message)
        })
    }

    getTheEvent() // filler UUID for now until local storage is setup
  }, [])

  return (
    <div>
      {/* <EventView eventId='39ae671a-21f0-40f2-b901-963317c0c974' /> */}
      <EventView />
      {events.length > 0 &&
        events.map((event) => (
          <EventCard
            title={event.title}
            starttime={event.starttime}
            endtime={event.endtime}
            key={event.id}
          />
        ))}
    </div>
  )
}

export default ViewEvent
