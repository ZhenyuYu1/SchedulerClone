'use client'
import { UUID } from 'crypto'
import { Attendee, getAttendees } from '@/utils/attendeesUtils'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getEvent } from '@/utils/eventsUtils'
import { Event } from '@/utils/eventsUtils'

import Header from '@/components/Header'
import EventView from '@/components/EventView'
import EventCard from '@/components/EventCard'
import Grid from '@/components/AvailabilityGrid'
import Responses from '@/components/Responses'

const ViewEvent = () => {
  const searchParams = useSearchParams()
  const eventId = searchParams.get('eventId')
  const [event, setEvent] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [recentlyViewedEvents, setRecentlyViewedEvents] = useState<Event[]>([])

  const [isAvailable, setIsAvailable] = useState(false) // set to true when name is entered at sign in
  const [isButtonsVisible, setIsButtonsVisible] = useState(false) // New state to control visibility of buttons

  const [responders, setResponders] = useState<Attendee[]>([]) // Set the responders state with the fetched data
  const [hoveredCell, setHoveredCell] = useState<{
    day: string
    time: string
  } | null>(null) // for cell hover in availability grid and responses

  // Callback Function to handle cell hover
  const handleCellHover = (day: string, time: string) => {
    setHoveredCell({ day, time })
  }

  // Converts the config object of days of the week to an array of strings
  const convertConfigToArray = (config: {
    [key: string]: boolean
  }): string[] => {
    if (!config || typeof config !== 'object') {
      console.error('Invalid config:', config)
      return []
    }
    return Object.keys(config).filter((day) => config[day])
  }

  // gets attendee data from the API and formats it
  const formatAttendeeData = (attendees: Attendee[]): Attendee[] => {
    return attendees.map((attendee) => ({
      users: attendee.users, // Ensure this matches the expected structure
      timesegments: attendee.timesegments, // Ensure this matches the expected structure
    }))
  }

  useEffect(() => {
    getEvent(eventId as UUID)
      .then(async (data) => {
        const newEvent: Event = {
          id: eventId as UUID,
          viewTime: new Date(),
          title: data[0].title,
          starttime: data[0].starttime,
          endtime: data[0].endtime,
          config: data[0].config || {},
          mode: data[0].mode || 'weekly', // TODO: need to modify to include both weekly & specific dates
        }

        setEvent(newEvent)
        if (!localStorage.getItem('FindingATimeRecentlyViewed')) {
          localStorage.setItem(
            'FindingATimeRecentlyViewed',
            JSON.stringify([newEvent]),
          )
          setRecentlyViewedEvents([newEvent])
        } else {
          let newRecentlyViewedEvents: Event[] = JSON.parse(
            localStorage.getItem('FindingATimeRecentlyViewed') as string,
          )
          newRecentlyViewedEvents = newRecentlyViewedEvents.filter((event) => {
            return event.id !== newEvent.id
          })
          newRecentlyViewedEvents.push(newEvent)
          newRecentlyViewedEvents = newRecentlyViewedEvents.sort((a, b) => {
            return (
              new Date(b.viewTime).getTime() - new Date(a.viewTime).getTime()
            )
          })
          localStorage.setItem(
            'FindingATimeRecentlyViewed',
            JSON.stringify(newRecentlyViewedEvents),
          )
          setRecentlyViewedEvents(newRecentlyViewedEvents)
        }
      })
      .catch((error) => {
        setError('No event found')
      })

    // Fetch attendees data
    getAttendees(eventId as UUID)
      .then((data) => {
        if (data) {
          //format attendee data
          const formattedData = formatAttendeeData(data)
          setResponders(formattedData) // Set the responders state with the fetched data
        } else {
          setError('No attendees found')
        }
      })

      .catch((error) => {
        console.error('Error fetching attendees:', error.message)
        setError('Failed to load attendees')
      })
  }, [eventId])

  return (
    <div className="w-full">
      <Header />
      <div //main screen
        className="flex min-h-screen w-full flex-col gap-8 p-8 md:flex-row"
      >
        <section //Left side container (Event form)
          className="h-full w-full rounded-lg px-6 py-16 shadow-lg md:w-[30%]"
        >
          {event && (
            <EventCard // Event Card to display Event Details
              eventId={event.id}
              title={event.title}
              starttime={event.starttime}
              endtime={event.endtime}
              days={null}
              date={null}
              key={event.id}
            />
          )}

          <div //button container for positioning button
            className="mx-4 flex justify-center pt-8"
          >
            <EventView // Event View which has Copy Link button
            />
          </div>
        </section>

        <section //Middle side container (Availability Grid)
          className="w-full gap-8 md:w-[57%]"
        >
          {event && (
            <Grid // Availability Grid
              earliestTime={event.starttime}
              latestTime={event.endtime}
              isAvailable={isAvailable}
              responders={responders}
              key={event.id}
              mode={event.mode}
              config={convertConfigToArray(event.config)}
              setConfig={event.setConfig}
              onCellHover={handleCellHover}
            />
          )}
          <div //button container for positioning "Save" and "Cancel" buttons
            className="flex flex-row justify-center gap-4 pt-8 "
          >
            <button
              className="btn btn-primary ml-4 rounded-full px-4 py-2 text-white"
              onClick={() => {
                setIsAvailable(true)
                setIsButtonsVisible(true) // Show buttons when user signs in
              }}
            >
              Edit My Availability
            </button>

            {isButtonsVisible && (
              <>
                <button
                  className="btn btn-outline rounded-full px-4 py-2 text-red-400 hover:!border-red-400 hover:bg-red-300"
                  onClick={() => {
                    setIsAvailable(false)
                    setIsButtonsVisible(false)
                  }} // Set availability selection mode to false when user cancels
                >
                  Cancel
                </button>

                <button className="btn btn-primary rounded-full px-4 py-2 text-white">
                  Save
                </button>
              </>
            )}
          </div>
        </section>

        <section //Right side container (Responses)
          className="w-full py-8 md:w-[13%]"
        >
          <Responses responders={responders} hoveredCell={hoveredCell} />
        </section>
      </div>
    </div>
  )
}

const ViewEventWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ViewEvent />
  </Suspense>
)

export default ViewEventWrapper
