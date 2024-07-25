import { randomUUID, UUID } from 'crypto'
import { insertEvent } from './eventsUtils'
import { create } from 'domain'

export function createUser(name: string) {
  fetch('/api/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
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
      if (!localStorage.getItem('username')) {
        localStorage.setItem('username', data[0].id)
        console.log('Local storage usernam: ', localStorage.getItem('username'))
      }
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error.message)
    })
}

export function getUser(userId: UUID) {
  fetch(`/api/users?userId=${userId}`, {
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
    })
    .catch((error) => {
      console.error('Error:', error.message)
    })
}

export async function addUserCreateEvent(
  title: string,
  description: string,
  starttime: string,
  endtime: string,
  location: string,
  timezone: string,
  mode: string,
  config: JSON,
  name: string,
) {
  if (!localStorage.getItem('username')) {
    await fetch('/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
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
        if (!localStorage.getItem('username')) {
          localStorage.setItem('username', data[0].id)
          console.log(
            'Local storage usernam: ',
            localStorage.getItem('username'),
          )
        }
        console.log('Success:', data)
      })
      .catch((error) => {
        console.error('Error:', error.message)
      })
  }

  await insertEvent(
    title,
    description,
    starttime,
    endtime,
    location,
    timezone,
    mode,
    config,
    localStorage.getItem('username') as UUID,
  )
}
