import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container page narrow center">
      <p className="eyebrow">404</p>
      <h1>That page isn’t on the schedule</h1>
      <p className="muted">It may have moved, or the session may have been withdrawn.</p>
      <p>
        <Link href="/schedule" className="button button-primary">
          Browse the schedule
        </Link>
      </p>
    </section>
  )
}
