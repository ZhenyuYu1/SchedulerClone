'use client'

import { createBrowserClient } from '@/utils/supabase'
import { useEffect, useState } from 'react'

export default function Page() {
  const [users, setUsers] = useState<any[] | null>(null)
  const [events, setEvents] = useState<any[] | null>(null)
  const [userData, setUserData] = useState({ name: '' })
  const [eventData, setEventData] = useState({ name: '' })
  const [message, setMessage] = useState<string>('')
  const supabase = createBrowserClient()

  useEffect(() => {
    const getData = async () => {
      const { data: userData, error: userFetchError } = await supabase
        .from('Users')
        .select()
      const { data: eventData, error: eventsFetchError } = await supabase
        .from('Events')
        .select()

      if (!userFetchError) {
        setUsers(userData)
      }

      if (!eventsFetchError) {
        setEvents(eventData)
      } else {
        console.error(eventsFetchError)
      }
    }

    getData()
  }, [])

  const insertEvent = (
    title: string,
    description: string,
    startTime: string,
    endTime: string,
    location: string,
    timezone: string,
    mode: string,
    config: JSON,
    creator: string,
  ) => {
    fetch('/api/events', {
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
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    insertEvent(
      'test',
      'test desc',
      '2022-01-01T00:00:00Z',
      '2022-01-01T01:00:00Z',
      'test location',
      'UTC',
      'weekly',
      JSON.parse(
        '{"monday": true, "tuesday": true, "wednesday": true, "thursday": true, "friday": true, "saturday": false, "sunday": false}',
      ),
      '9e33186f-95db-4385-a974-ee38c8e07547',
    )
  }

  return (
    <>
      <div>
        {users ? (
          <div>
            {users.map((user, index) => (
              <p key={index}>{user.name}</p>
            ))}
          </div>
        ) : (
          'Loading users...'
        )}
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>

      {message && <p>{message}</p>}

      {events ? (
        <div>
          {events.map((event, index) => (
            <p
              key={index}
            >{`Title: ${event.title}, Description: ${event.description}, StartTime: ${event.startTime}, EndTime: ${event.endTime}, Location: ${event.location}, Timezone: ${event.timezone}, Weekly/Specific: ${event.isWeekly}, Config: ${JSON.stringify(event.config)}, Creator: ${event.creator}`}</p>
          ))}
        </div>
      ) : (
        'Loading events...'
      )}
    </>
  )
}
