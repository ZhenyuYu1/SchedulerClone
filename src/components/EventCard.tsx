import Link from 'next/link'
import { UUID } from 'crypto'
import { useState, useEffect } from 'react'
import { getNumRespondents } from '@/utils/attendeesUtils'

interface EventCardProps {
  eventId: UUID
  title: string
  starttime: string
  endtime: string
  location: string
  timezone: string
}

export default function EventCard({
  eventId,
  title,
  starttime,
  endtime,
  location,
  timezone,
}: EventCardProps) {
  const [numRespondents, setNumRespondents] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getNumRespondents(eventId).then((data) => {
      if (data) {
        setNumRespondents(data)
      }
      setIsLoading(false)
    })
  }, [])

  return (
    <Link href={`/view-event?eventId=${eventId}`}>
      <div className="flex h-48 flex-col justify-between rounded-md bg-white p-4 shadow-lg">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-bold">{title}</h2>
            <p>
              Start Time: {starttime} {timezone}
            </p>
            <p>
              End Time: {endtime} {timezone}
            </p>
            <p>Location: {location}</p>
            <p>Number of Respondents: {numRespondents}</p>
          </div>
        )}
      </div>
    </Link>
  )
}
