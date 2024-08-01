import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-full bg-base-200 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex text-xl font-bold">
          <Image
            src="/CalendarIcon.png"
            width="1000"
            height="1000"
            alt="calendar"
            className="inline-block h-8 w-8"
          />
          <Link className="pl-4" href="/">
            <p className="text-primary">FindATime</p>
          </Link>
        </div>
        <div>
          <Link href="/home">
            <button className="btn btn-primary ml-3">Dashboard</button>
          </Link>
          <Link href="/create-event">
            <button className="btn btn-primary ml-3">Create Event</button>
          </Link>
          <Link href="#FAQ">
            <button className="btn btn-primary ml-3">FAQ</button>
          </Link>
        </div>
      </div>
    </header>
  )
}
