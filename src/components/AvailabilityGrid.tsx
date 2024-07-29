'use client'
import React, { useState } from 'react'

interface GridProps {
  isAvailable: boolean
  userName: string
}

const Grid = ({ isAvailable, userName }: GridProps) => {
  const dimensions = {
    width: 7,
    height: 8,
  }

  // Initialize and populate an empty 2d array
  const initialGrid = Array(dimensions.height)
    .fill(null)
    .map(() => Array(dimensions.width).fill(false))

  const [grid, setGrid] = useState(initialGrid)
  const [isSelecting, setIsSelecting] = useState(false)

  // Function is called when the mouse is pressed down on a cell
  const handleMouseDown = (rowIndex: number, colIndex: number) => {
    if (!isAvailable) return
    setIsSelecting(true)
    toggleCell(rowIndex, colIndex)
  }

  // Function is called when the mouse enters a cell while the mouse button is pressed
  const handleMouseEnter = (rowIndex: number, colIndex: number) => {
    if (!isAvailable) return
    if (isSelecting) {
      toggleCell(rowIndex, colIndex)
    }
  }

  // Function is called when the mouse button is released
  const handleMouseUp = () => {
    setIsSelecting(false)
  }

  // Function toggles the value of a cell
  const toggleCell = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid]
    newGrid[rowIndex][colIndex] = !newGrid[rowIndex][colIndex]
    setGrid(newGrid)
  }

  return (
    <div onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <div className="m-4 border border-gray-300">
        <div className="grid grid-cols-7">
          {grid.map((row, rowIndex) =>
            row.map((isSelected, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-26 flex h-16 ${
                  isSelected ? 'bg-green-500' : 'bg-white'
                } ${colIndex < 6 ? 'border-r border-gray-100' : ''} ${
                  rowIndex < 7 ? 'border-b border-gray-100' : ''
                } cursor-pointer`}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              ></div>
            )),
          )}
        </div>
      </div>
    </div>
  )
}

export default Grid
