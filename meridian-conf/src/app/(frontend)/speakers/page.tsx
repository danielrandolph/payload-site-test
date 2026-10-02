import type { Metadata } from 'next'
import Link from 'next/link'

import { Avatar } from '@/components/Avatar'
import { formatShortDay, formatTime } from '@/lib/format'
import { getSpeakers } from '@/lib/queries'
import type { Event } from '@/payload-types'

export const metadata: Metadata = { title: 'Speakers' }

export default async function SpeakersPage() {
  const speakers = await getSpeakers()

  return (
    <section className="container page">
      <header className="page-head">
        <p className="eyebrow">{speakers.length} speakers</p>
        <h1>Speakers</h1>
        <p className="lede">
          Practitioners from companies large and small, chosen from more than 900 proposals for what they’ve built and
          what they’ve learned the hard way.
        </p>
      </header>

      <ul className="speaker-grid">
        {speakers.map((speaker) => {
          const sessions = (speaker.sessions?.docs ?? []).filter((s): s is Event => typeof s === 'object')
          return (
            <li key={speaker.id} id={speaker.slug} className="speaker-card">
              <div className="speaker-card-head">
                <Avatar name={speaker.name} accent={speaker.accent} size={64} />
                <div>
                  <h2>{speaker.name}</h2>
                  <p className="muted">
                    {speaker.role}
                    <br />
                    {speaker.company}
                  </p>
                </div>
              </div>
              <p className="speaker-bio">{speaker.bio}</p>
              {sessions.length ? (
                <ul className="speaker-sessions">
                  {sessions.map((session) => (
                    <li key={session.id}>
                      <Link href={`/events/${session.slug}`}>{session.title}</Link>
                      <span className="muted small">
                        {formatShortDay(session.startsAt)} · {formatTime(session.startsAt)} · {session.room}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
