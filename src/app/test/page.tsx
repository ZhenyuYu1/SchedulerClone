'use client'

import { UUID } from 'crypto'
import { useEffect, useState } from 'react'
import { createUser, getUser } from '@/utils/userUtils'

export default function Test() {
  const [username, setUsername] = useState<string>('')
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    if (localStorage.getItem('username')) {
      getUser(localStorage.getItem('username') as UUID)
        .then((userData) => setUser(userData[0]))
        .catch((error) => console.error(error))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUser(username)
    setUser({ name: username })
  }

  return (
    <div>
      {!user && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="input w-full border-gray-300 bg-white text-base font-normal focus-visible:ring-0"
          />
          <button type="submit">Submit</button>
        </form>
      )}
      <p>Username: {user ? user.name : ''}</p>
    </div>
  )
}
