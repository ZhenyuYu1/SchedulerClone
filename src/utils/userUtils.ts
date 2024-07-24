import { randomUUID, UUID } from 'crypto'

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

export function setUsernameLocalStorage() {
  if (localStorage.getItem('username')) {
    return
  }
  createUser('testUsername23')
}
