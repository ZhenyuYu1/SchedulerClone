'use client'
import React, { useState, useEffect } from 'react'
import { generateTimeRange } from '@/utils/timeUtils'

interface GridProps {
  earliestTime: string
  latestTime: string
  isAvailable: boolean // Determines if the grid is selectable
  daysOfWeek: string[]
}

const Grid = ({
  earliestTime,
  latestTime,
  isAvailable,
  daysOfWeek,
}: GridProps) => {
  // Generate time array for row headings
  const timeArray = generateTimeRange(earliestTime, latestTime)

  // Grid dimensions
  const dimensions = {
    width: daysOfWeek.length || 1, // default to 1 if daysOfWeek is empty
    height: timeArray.length,
  }

  // Function to Initialize and populate an empty 2d array
  const initialGrid = () => {
    return Array(dimensions.height)
      .fill(null)
      .map(() => Array(dimensions.width).fill(false))
  }

  const [grid, setGrid] = useState(initialGrid)
  const [isSelecting, setIsSelecting] = useState(false)

  // Update grid dimensions when daysOfWeek changes
  useEffect(() => {
    setGrid(initialGrid())
  }, [daysOfWeek.length, timeArray.length])

  // Function is called when the mouse is pressed down on a cell
  const handleMouseDown = (rowIndex: number, colIndex: number) => {
    if (!isAvailable) return
    console.log(`Mouse Down: Row ${rowIndex}, Col ${colIndex}`)
    setIsSelecting(true)
    toggleCell(rowIndex, colIndex)
  }

  /* 
    Function is called when the mouse enters a cell while 
    the mouse button is pressed 
  */
  const handleMouseEnter = (rowIndex: number, colIndex: number) => {
    if (!isAvailable) return
    if (isSelecting) {
      console.log(`Mouse Enter: Row ${rowIndex}, Col ${colIndex}`)
      toggleCell(rowIndex, colIndex)
    }
  }

  // Function is called when the mouse button is released
  const handleMouseUp = () => {
    console.log('Mouse Up')
    setIsSelecting(false)
  }

  // Function toggles the value of a cell
  const toggleCell = (rowIndex: number, colIndex: number) => {
    console.log(`Toggling Cell: Row ${rowIndex}, Col ${colIndex}`)
    const newGrid = [...grid]
    newGrid[rowIndex][colIndex] = !newGrid[rowIndex][colIndex]
    setGrid(newGrid)
  }

  return (
    <div onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <div
        className="grid-container"
        style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}
      >
        {/* Time row headers */}
        <div
          className="grid-time-headers"
          style={{
            display: 'grid',
            gridTemplateRows: `repeat(${dimensions.height}, 1fr)`,
            alignItems: 'center',
          }}
        >
          {timeArray.map((time, index) => (
            <div
              key={index}
              className="flex items-center justify-end border-gray-300 pr-2"
              style={{ height: '64px' }}
            >
              {time}
            </div>
          ))}
        </div>

        <div>
          {/* Grid Column header displaying days of the week */}
          <div
            className="grid-header"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${dimensions.width}, 1fr)`,
            }}
          >
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-center border-gray-300"
                style={{ height: '2rem' }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Main Grid body cells for selecting and deselecting */}
          <div
            className="grid h-full border border-gray-300"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${dimensions.width}, 1fr)`,
              gridTemplateRows: `repeat(${dimensions.height}, 1fr)`,
              width: '100%',
              height: `${dimensions.height * 64 + 3}px`,
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((isSelected, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`flex h-16 ${
                    isSelected ? 'bg-green-500' : 'bg-white'
                  } ${colIndex < dimensions.width - 1 ? 'border-r border-gray-100' : ''} ${
                    rowIndex < dimensions.height - 1
                      ? 'border-b border-gray-100'
                      : ''
                  } cursor-pointer`}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                ></div>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Grid
