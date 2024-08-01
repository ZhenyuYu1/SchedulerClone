import Link from 'next/link'

export default function Tutorial() {
  return (
    <div
      id="Tutorial"
      className="mb-5 mt-10 flex flex-col items-center justify-center"
    >
      <h1 className="mb-4 text-center text-4xl font-extrabold text-primary">
        How it works:
      </h1>
      <ol className="list-inside list-decimal text-xl">
        <li>Create a new FindATime event using the events form</li>
        <li>Share the provided link with participants</li>
        <li>View and edit your events from the dashboard</li>
      </ol>
      <div className="mt-4">
        <Link href="/home">
          <button className="btn btn-primary">Get Started</button>
        </Link>
      </div>
    </div>
  )
}
