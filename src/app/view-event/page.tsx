//import EventView from '@/components/EventView'
'use client'

import { Toaster, toast } from 'react-hot-toast'

import React from 'react'

const ViewEvent = () => {
  return (
    <div onClick={() => toast.success('Copied Link!')}>
      <button className="btn btn-primary">Copy Link</button>
      <Toaster rich colors />
      {/*<button className="btn btn-primary">Copy Link</button>*/}
    </div>
  )
}

export default ViewEvent
