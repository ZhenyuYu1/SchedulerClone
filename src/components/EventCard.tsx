interface EventCardProps {
  title: string
  startTime: string
  endTime: string
}

export default function EventCard({
  title,
  startTime,
  endTime,
}: EventCardProps) {
  return (
    <div className="flex h-48 flex-col justify-between rounded-md bg-white p-4 shadow-lg">
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        <p>Start Time: {startTime}</p>
        <p>End Time: {endTime}</p>
      </div>
    </div>
  )
}
