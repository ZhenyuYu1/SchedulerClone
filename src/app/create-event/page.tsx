'use client'
import { useState, useRef } from 'react'
import { randomUUID, UUID } from 'crypto'
import { addUserCreateEvent } from '@/utils/userUtils'
import { insertEvent } from '@/utils/eventsUtils'

import EventForm from '@/components/EventForm'
import Grid from '@/components/AvailabilityGrid'

export default function CreateEvent() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [earliestTime, setEarliestTime] = useState('')
  const [latestTime, setLatestTime] = useState('')
  const [mode, setMode] = useState('weekly')
  const [config, setConfig] = useState<JSON | null>(null)
  const [daysOfWeek, setDaysOfWeek] = useState<string[] | null>([])
  const [specificDays, setSpecificDays] = useState<Date[]>([])
  const [timezone, setTimezone] = useState('')

  const [isAvailable, setIsAvailable] = useState(false) // set to true when name is entered at sign in
  const [userName, setUserName] = useState('') // set to name entered at sign in
  const dialogRef = useRef<HTMLDialogElement>(null) // modal

  // Create Event Button function
  const handleSubmit = () => {
    console.log(`Title: ${title}`)
    console.log(`Description: ${description}`)
    console.log(`Location: ${location}`)
    console.log(`Earliest Time: ${earliestTime}`)
    console.log(`Latest Time: ${latestTime}`)
    console.log(`Mode: ${mode}`)
    console.log(`DaysOfWeek: ${daysOfWeek}`)
    console.log(`Timezone: ${timezone}`)

    const daysOfWeekJSON: { [key: string]: boolean } = {
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
      Sun: false,
    }

    if (daysOfWeek) {
      daysOfWeek.forEach((day) => {
        if (daysOfWeekJSON.hasOwnProperty(day)) {
          daysOfWeekJSON[day] = true
        }
      })
    }

    addUserCreateEvent(
      title,
      description,
      earliestTime,
      latestTime,
      location,
      timezone,
      mode,
      mode === 'weekly'
        ? daysOfWeekJSON
        : JSON.parse('{"days": ["2024-01-01"]}'), // filler for specific mode now because no calendar yet
    )
  }

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal()
    }
  }

  return (
    <div //main screen
      className="flex min-h-screen w-full flex-col md:flex-row"
    >
      <section //Left side container
        className="h-full w-full p-10 md:w-2/5"
      >
        <EventForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          location={location}
          setLocation={setLocation}
          earliestTime={earliestTime}
          setEarliestTime={setEarliestTime}
          latestTime={latestTime}
          setLatestTime={setLatestTime}
          mode={mode}
          setMode={setMode}
          daysOfWeek={daysOfWeek}
          setDaysOfWeek={setDaysOfWeek}
          specificDays={specificDays}
          setSpecificDays={setSpecificDays}
          timezone={timezone}
          setTimezone={setTimezone}
          handleSubmit={handleSubmit}
        />
      </section>

      <section //Right side container
        className="w-full p-4 md:w-3/5 md:p-10"
      >
        <div //button container for positioning button
          className="mx-4 flex justify-end"
        >
          <button
            className="btn btn-primary ml-4 rounded px-4 py-2 text-white"
            onClick={openModal}
          >
            Add Availability
          </button>

          <dialog ref={dialogRef} id="my_modal_1" className="modal">
            <div className="modal-box bg-white focus:outline-white ">
              <h3 className="py-4 text-lg font-bold">Sign In</h3>

              <input
                type="text"
                placeholder="Enter Your Name"
                className="input input-bordered w-full max-w-xs bg-white py-4"
                onChange={(e) => {
                  setUserName(e.target.value)
                  setIsAvailable(true)
                }} // Update isAvailable to true when name is entered
              />

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-primary ml-4 rounded px-4 py-2 text-white">
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <Grid isAvailable={isAvailable} userName={userName} />
      </section>
    </div>
  )
}
