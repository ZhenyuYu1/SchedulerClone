interface EventCardProps {
  title: string
  starttime: string
  endtime: string
}

export default function EventCard({
  title,
  starttime,
  endtime,
}: EventCardProps) {
  return (
    <div className="flex h-48 flex-col justify-between rounded-md bg-white p-4 shadow-lg">
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        <p>Start Time: {starttime}</p>
        <p>End Time: {endtime}</p>
      </div>
    </div>
  )
}
