import { UUID } from 'crypto'

export async function insertEvent(
  title: string,
  description: string,
  starttime: string,
  endtime: string,
  location: string,
  timezone: string,
  mode: string,
  config: JSON,
  creator: UUID,
) {
  fetch('/api/events/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      description: description,
      starttime: starttime,
      endtime: endtime,
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
