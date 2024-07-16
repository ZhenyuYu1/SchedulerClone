'use client'
import React from 'react'

interface EventFormProps {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  location: string
  setLocation: React.Dispatch<React.SetStateAction<string>>
  earliestTime: string
  setEarliestTime: React.Dispatch<React.SetStateAction<string>>
  latestTime: string
  setLatestTime: React.Dispatch<React.SetStateAction<string>>
  daysOfWeek: string[]
  setDaysOfWeek: React.Dispatch<React.SetStateAction<string[]>>
  timezone: string
  setTimezone: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: () => void
}

const EventForm = ({
  title,
  setTitle,
  description,
  setDescription,
  location,
  setLocation,
  earliestTime,
  setEarliestTime,
  latestTime,
  setLatestTime,
  daysOfWeek,
  setDaysOfWeek,
  timezone,
  setTimezone,
  handleSubmit,
}: EventFormProps) => {
  return (
    <div className="flex w-full flex-col md:flex-row">
      <div //Left side container
        className="h-full w-full p-10 md:w-2/5"
      >
        <form //Form to enter Event datat (Title, Description...etc)
          className="flex w-full flex-col gap-6"
        >
          <input //Event Title text input
            type="text"
            value={title}
            placeholder="New Event Title"
            onChange={(e) => setTitle(e.target.value)}
            className="input w-full border-gray-300 bg-white text-2xl font-medium focus-visible:ring-0"
          />

          <textarea //Event Description text input
            value={description}
            placeholder="Event Description"
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full border-gray-300 bg-white text-base font-normal focus-visible:ring-0"
          ></textarea>

          <input //Event Location text input
            type="text"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            className="input w-full border-gray-300 bg-white text-base font-normal focus-visible:ring-0"
          />

          <div //Event EarliestTime to LatestTime row container
            className="flex w-full flex-row items-center gap-3"
          >
            <select //EarliestTime dropdown
              value={earliestTime}
              onChange={(e) => setEarliestTime(e.target.value)}
              className="select w-full max-w-xl border-gray-300 bg-white text-base font-normal"
            >
              <option disabled selected>
                Earliest Time
              </option>
              <option>9:00 AM</option>
              <option>5:00 PM</option>
            </select>

            <p //"to"
              className="text-normal font-normal text-gray-400"
            >
              to
            </p>

            <select //LatestTime dropdown
              value={latestTime}
              onChange={(e) => setLatestTime(e.target.value)}
              className="select w-full max-w-xl border-gray-300 bg-white text-base font-normal"
            >
              <option disabled selected>
                Latest Time
              </option>
              <option>9:00 AM</option>
              <option>5:00 PM</option>
            </select>
          </div>

          <div //Days of the week
            className="join w-full"
          >
            <input
              className="btn join-item border-gray-300 bg-white"
              type="checkbox"
              name="options"
              aria-label="Mon"
            />
            <input
              className="btn join-item border-gray-300 bg-white"
              type="checkbox"
              name="options"
              aria-label="Tue"
            />
            <input
              className="btn join-item border-gray-300 bg-white"
              type="checkbox"
              name="options"
              aria-label="Wed"
            />
            <input
              className="btn join-item border-gray-300 bg-white"
              type="checkbox"
              name="options"
              aria-label="Thu"
            />
            <input
              className="btn join-item border-gray-300 bg-white"
              type="checkbox"
              name="options"
              aria-label="Fri"
            />
            <input
              className="btn join-item border-gray-300 bg-white"
              type="checkbox"
              name="options"
              aria-label="Sat"
            />
            <input
              className="btn join-item border-gray-300 bg-white"
              type="checkbox"
              name="options"
              aria-label="Sun"
            />
          </div>

          <select //Timezone dropdown
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="select w-full border-gray-300 bg-white text-base font-normal"
          >
            <option disabled selected>
              Time zone
            </option>
            <option>PST (Pacific Standard Time)</option>
            <option>EST (Eastern Standard Time)</option>
          </select>
        </form>

        <button
          onClick={handleSubmit}
          className="btn btn-outline mt-6 w-full self-center"
        >
          Create Event
        </button>
      </div>

      <div //Right side container
        className="flex w-full bg-green-200 p-10 md:w-3/5"
      >
        <p>Right Panel</p>
      </div>
    </div>
  )
}

export default EventForm
