'use client'

import { createBrowserClient } from '@/utils/supabase'
import { UUID } from 'crypto'
import { useEffect, useState } from 'react'

export default function Page() {
  const [username, setUsername] = useState('')
  const [events, setEvents] = useState<any[] | null>(null)
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    timezone: '',
    mode: '',
    config: JSON,
    creator: '',
  })
  const [submitMessage, setSubmitMessage] = useState('')
  const supabase = createBrowserClient()

  useEffect(() => {
    const username = localStorage.getItem('username')
    if (username) {
      setUsername(username)
    }
    const getMyEvents = async (creatorId: UUID) => {
      const { data, error } = await supabase
        .from('Events')
        .select()
        .eq('creator', creatorId)

      if (!error) {
        setEvents(data)
      } else {
        console.error(error)
      }
    }

    getMyEvents('9e33186f-95db-4385-a974-ee38c8e07547')
  }, [events])

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
        if (response.ok) {
          setSubmitMessage('Event submitted successfully')
        } else {
          setSubmitMessage('Error submitting event')
        }
        return response.json()
      })
      .then((data) => {
        setEvents((prevEvents) => [...(prevEvents || []), data])
      })
      .catch((error) => {
        setSubmitMessage('Error submitting event')
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    })
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleUsernameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // store username in local storage
    localStorage.setItem('username', username)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // insert with random UUID for now
    insertEvent(
      eventData.title,
      eventData.description,
      eventData.startTime,
      eventData.endTime,
      eventData.location,
      eventData.timezone,
      eventData.mode,
      JSON.parse(
        '{"days": ["2024-07-17", "2024-07-18", "2024-07-19", "2024-07-20", "2024-07-21", "2024-07-22", "2024-07-23"]}',
      ),
      '9e33186f-95db-4385-a974-ee38c8e07547', // random UUID,
    )
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <br />
          <input
            type="datetime-local"
            name="startTime"
            placeholder="Start Time"
            onChange={handleChange}
          />
          <br />
          <input
            type="datetime-local"
            name="endTime"
            placeholder="End Time"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="timezone"
            placeholder="Timezone"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="mode"
            placeholder="Mode"
            onChange={handleChange}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      {submitMessage && <p>{submitMessage}</p>}

      <p>Username: {username}</p>
      {!localStorage.getItem('username') && (
        <form onSubmit={handleUsernameSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleUsernameChange}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      )}

      <button
        onClick={() => {
          localStorage.removeItem('username')
          setUsername('')
        }}
      >
        Clear Username
      </button>

      {events ? (
        <div>
          {events.map((event, index) => (
            <div key={index}>
              <p
                key={index}
              >{`Title: ${event.title}, Description: ${event.description}, StartTime: ${event.startTime}, EndTime: ${event.endTime}, Location: ${event.location}, Timezone: ${event.timezone}, Weekly/Specific: ${event.mode}, Config: ${JSON.stringify(event.config)}, Creator: ${event.creator}`}</p>
              <br />
            </div>
          ))}
        </div>
      ) : (
        'Loading events...'
      )}
    </>
  )
}
