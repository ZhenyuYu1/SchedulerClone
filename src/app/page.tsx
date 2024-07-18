import AuthButton from '@/components/AuthButton'
import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps'
import SignUpUserSteps from '@/components/SignUpUserSteps'
import Header from '@/components/Header'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import ThemeToggle from '@/components/ThemeToggle'

export default async function Index() {
  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createServerClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <div className="container mx-auto p-4">
      {' '}
      {/*main container with max width auto center and padding 4*/}
      <div className="flex">
        {' '}
        {/*flex container to arrange child elements in a row*/}
        <div className="w-2/3 p-4">
          {' '}
          {/*container for left side 2/3 of the width and has padding 4*/}
          <div className="mb-4 flex items-center justify-start">
            {' '}
            {/*flex container to align heading and button horizontally to have them closer together*/}
            <h1 className="text-2xl font-black font-extrabold">My Events</h1>{' '}
            {/*heading for MY Events*/}
            <button className="btn btn-primary ml-6">+ New Event</button>{' '}
            {/*button to add new event with primary styling and margin left 6*/}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {' '}
            {/*grid container with 2 columns and gap between the items*/}
            <div className="flex h-48 flex-col justify-between rounded-md bg-white p-4 shadow-lg">
              {' '}
              {/*box with shadow, padding 4, white background, with rounded corners, fixed height of 48, flex column layout with even distribution*/}
              <div>
                <h2 className="text-lg font-bold">Event 1</h2>{' '}
                {/*event title with large text and a bold font*/}
                <p>01/01/2024</p> {/*event date*/}
              </div>
            </div>
            <div className="flex h-48 flex-col justify-between rounded-md bg-white p-4 shadow-lg">
              <div>
                <h2 className="text-lg font-bold">Event 2</h2>
                <p>02/02/2024</p>
              </div>
            </div>
            <div className="flex h-48 flex-col justify-between rounded-md bg-white p-4 shadow-lg">
              <div>
                <h2 className="text-lg font-bold">Event 3</h2>
                <p>03/03/2024</p>
              </div>
            </div>
            <div className="flex h-48 flex-col justify-between rounded-md bg-white p-4 shadow-lg">
              <div>
                <h2 className="text-lg font-bold">Event 4</h2>
                <p>04/04/2024</p>
              </div>
            </div>
            <div className="flex h-48 flex-col justify-between rounded-md bg-white p-4 shadow-lg">
              <div>
                <h2 className="text-lg font-bold">Event 5</h2>
                <p>05/05/2024</p>
              </div>
            </div>
            <div className="flex h-48 flex-col justify-between rounded-md bg-white p-4 shadow-lg">
              <div>
                <h2 className="text-lg font-bold">Event 6</h2>
                <p>06/06/2024</p>
              </div>
            </div>
          </div>{' '}
          {/*div to close grid container*/}
        </div>{' '}
        {/*div to close left side container*/}
        <div className="w-1/3 bg-white p-4">
          {/*container for right side 1/3 of the width and has padding 4 background white and is left blank on prupose (will add later)*/}
        </div>
      </div>{' '}
      {/*div to close flex container*/}
    </div>
  )
}
