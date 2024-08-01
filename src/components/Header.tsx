import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-full bg-base-200 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex text-xl font-bold">
          <Image
            src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678116-calendar-512.png"
            width="10"
            height="10"
            alt="calendar"
            className="inline-block h-8 w-8"
          />
          <Link className="pl-4" href="/">
            <p className="text-primary">FindATime</p>
          </Link>
        </div>
        <Link href="#FAQ">
          <button className="btn btn-primary ml-6">
            Frequently Asked Questions
          </button>
        </Link>
      </div>
    </header>
  )
}
