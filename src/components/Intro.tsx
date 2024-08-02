import Link from 'next/link'

export default function Intro() {
  return (
    <div id="Intro">
      <div className="container mx-auto flex items-center justify-between">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Make time for your next meeting with FindingATime!
          </h1>
          <p className="mt-4 text-lg">
            FindingATime is a simple tool that helps you schedule meetings with
            your team or clients.
          </p>
        </div>
      </div>
    </div>
  )
}
