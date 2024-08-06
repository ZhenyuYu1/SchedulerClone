'use client'
import React from 'react'

interface ResponsesProps {
  responders?: string[]
}

const Responses = ({ responders }: ResponsesProps) => {
  return (
    <div>
      <h3 className="pb-3 text-sm font-medium text-gray-600">
        Responses ({responders?.length}/{responders?.length})
      </h3>
      <ul className="text-xs text-gray-500">
        {responders?.map((responders, index) => (
          <li key={index}>{responders}</li>
        ))}
      </ul>
    </div>
  )
}

export default Responses
