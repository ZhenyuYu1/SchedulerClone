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
  }, [supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data: insertedData, error } = await supabase
      .from('Users')
      .insert([userData])
      .select()
    // fetch('/api/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: "Test user2"
    //   })
    // })

    // fetch('/api/events', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     title: "Test inserting event with API",
    //     description: "API insert",
    //     startTime: "2022-01-01T00:00:00",
    //     endTime: "2022-01-01T01:00:00",
    //     location: "API",
    //     timezone: "2022-01-01T01:00:00+00",
    //     isWeekly: true,
    //     config: {
    //       "friday": "True",
    //       "monday": "False",
    //       "sunday": "True",
    //       "tuesday": "True",
    //       "saturday": "False",
    //       "thursday": "False",
    //       "wednesday": "False"
    //     },
    //     creator: "03db2d61-abc4-4f3a-8cc8-8995494787bf"
    //   })
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch((error) => console.error('Error:', error));

    if (error) {
      setMessage(`Error inserting data: ${error.message}`)
    } else {
      setMessage('Data inserted: ' + JSON.stringify(insertedData[0].name))
      setUserData({ name: '' })
      setUsers((prevUsers) =>
        prevUsers ? [...prevUsers, userData] : [userData],
      )
    }
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
