'use client'
import { useState, useRef } from 'react'
import { randomUUID, UUID } from 'crypto'
import { addUserCreateEvent } from '@/utils/userUtils'
import { insertEvent } from '@/utils/eventsUtils'

import EventForm from '@/components/EventForm'
import Grid from '@/components/AvailabilityGrid'
import Responses from '@/components/Responses'

export default function CreateEvent() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [earliestTime, setEarliestTime] = useState('9:00 AM')
  const [latestTime, setLatestTime] = useState('5:00 PM')
  const [mode, setMode] = useState('weekly')
  const [config, setConfig] = useState<JSON | null>(null)
  const [daysOfWeek, setDaysOfWeek] = useState<string[] | null>(null)
  const [specificDays, setSpecificDays] = useState<Number[]>([])
  const [timezone, setTimezone] = useState('')

  const [isAvailable, setIsAvailable] = useState(false) // set to true when name is entered at sign in
  const [userName, setUserName] = useState('') // set to name entered at sign in
  const [responders, setResponders] = useState<string[]>([]) // array to store names of users who signed in
  const dialogRef = useRef<HTMLDialogElement>(null) // modal

  const [isButtonsVisible, setIsButtonsVisible] = useState(false) // New state to control visibility of buttons

  /* 
    Add userName to responders array when they click the "Save" button 
   */
  const handleSaveResponse = () => {
    if (userName) {
      setResponders((prevResponders) => {
        const updatedResponders = [...prevResponders, userName]
        return updatedResponders
      })
      if (dialogRef.current) {
        dialogRef.current.close()
      }
    }
  }

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

    // Call handleSaveResponse to save the response
    handleSaveResponse()
    setIsAvailable(false) // Set availability to false when user creates event/saves their availability
    setIsButtonsVisible(false) // Hide buttons after creating event
  }

  // Function to open modal for after clicking "Sign In"
  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal()
    }
  }

  return (
    <div //main screen
      className="flex min-h-screen w-full flex-col gap-8 p-8 md:flex-row"
    >
      <section //Left side container (Event form)
        className="h-full w-full rounded-lg px-6 py-16 shadow-lg md:w-[30%]"
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
        />

        <div //button container for positioning button
          className="mx-4 flex justify-center pt-8"
        >
          <button
            className="btn btn-primary ml-4 rounded-full px-4 py-2 text-white"
            onClick={openModal}
          >
            Add Availability
          </button>

          <dialog ref={dialogRef} id="username_modal" className="modal">
            <div className="modal-box bg-white focus:outline-white ">
              <h3 className="py-4 text-lg font-bold">Sign In</h3>

              <input
                type="text"
                placeholder="Enter Your Name"
                className="input input-bordered w-full max-w-xs bg-white py-4"
                onChange={(e) => {
                  setUserName(e.target.value)
                }} // Update isAvailable to true when name is entered
              />

              <div className="modal-action">
                <form method="dialog">
                  <button
                    className="btn btn-primary ml-4 rounded-full px-4 py-2 text-white"
                    onClick={() => {
                      setIsAvailable(true)
                      setIsButtonsVisible(true) // Show buttons when user signs in
                    }}
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </section>

      <section //Middle side container (Availability Grid)
        className="w-full gap-8 md:w-[57%]"
      >
        <Grid
          earliestTime={earliestTime}
          latestTime={latestTime}
          isAvailable={isAvailable}
          daysOfWeek={daysOfWeek || []}
        />

        {isButtonsVisible && ( // Conditionally render buttons section
          <div //button container for positioning "Save" and "Cancel" buttons
            className="flex flex-row justify-center gap-4 pt-8 "
          >
            <button
              className="btn btn-outline rounded-full px-4 py-2 text-red-400 hover:!border-red-400 hover:bg-red-300"
              onClick={() => {
                setIsAvailable(false)
                setIsButtonsVisible(false)
              }} // Set availability to false when user cancels
            >
              Cancel
            </button>

            <button
              className="btn btn-primary rounded-full px-4 py-2 text-white"
              onClick={handleSubmit}
            >
              Create Event
            </button>
          </div>
        )}
      </section>

      <section //Right side container (Responses)
        className="w-full py-8 md:w-[13%]"
      >
        <Responses responders={responders} />
      </section>
    </div>
  )
}
