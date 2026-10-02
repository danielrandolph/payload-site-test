import Link from 'next/link'

import { Avatar } from '@/components/Avatar'
import { EventCard, speakerNames } from '@/components/EventCard'
import { dayKey, formatShortDay, formatTimeRange } from '@/lib/format'
import { getCurrentUser } from '@/lib/payload'
import { CONFERENCE, TRACKS } from '@/lib/program'
import { getEvents, getMyRegistrations, getSeatCounts, getSpeakers } from '@/lib/queries'
import type { Speaker } from '@/payload-types'

export default async function HomePage() {
  const [events, speakers, counts, user] = await Promise.all([
    getEvents(),
    getSpeakers(),
    getSeatCounts(),
    getCurrentUser(),
  ])
  const mine = new Map((await getMyRegistrations(user)).map((r) => [r.event.id, r.status]))

  const sessions = events.filter((e) => e.type !== 'break')
  const keynotes = events.filter((e) => e.type === 'keynote')
  const workshops = events.filter((e) => e.type === 'workshop')
  const days = [...new Set(events.map((e) => dayKey(e.startsAt)))]
  const tracks = TRACKS.filter((t) => t.value !== 'general').map((track) => ({
    ...track,
    count: sessions.filter((e) => e.track === track.value).length,
  }))

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow eyebrow-light">
            {CONFERENCE.dates} · {CONFERENCE.city}
          </p>
          <h1 className="hero-title">
            Software that <em>holds up</em>.
          </h1>
          <p className="hero-lede">
            Meridian is three days of talks, workshops, and hallway conversations about building systems people can
            rely on — AI in production, platforms, security, data, the web, and the teams behind them.
          </p>
          <div className="hero-actions">
            <Link href="/schedule" className="button button-primary button-large">
              Explore the schedule
            </Link>
            {user ? (
              <Link href="/account" className="button button-ghost button-large">
                My registrations
              </Link>
            ) : (
              <Link href="/signup" className="button button-ghost button-large">
                Create your attendee account
              </Link>
            )}
          </div>
          <dl className="hero-stats">
            <div>
              <dt>Days</dt>
              <dd>{days.length}</dd>
            </div>
            <div>
              <dt>Sessions</dt>
              <dd>{sessions.length}</dd>
            </div>
            <div>
              <dt>Workshops</dt>
              <dd>{workshops.length}</dd>
            </div>
            <div>
              <dt>Speakers</dt>
              <dd>{speakers.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Main stage</p>
            <h2>Keynotes</h2>
          </div>
          <Link href="/schedule" className="text-link">
            Full schedule →
          </Link>
        </div>
        <div className="keynote-grid">
          {keynotes.map((event) => {
            const speaker = (event.speakers ?? []).find((s): s is Speaker => typeof s === 'object')
            return (
              <Link key={event.id} href={`/events/${event.slug}`} className="keynote-card">
                {speaker ? <Avatar name={speaker.name} accent={speaker.accent} size={56} /> : null}
                <p className="keynote-when">
                  {formatShortDay(event.startsAt)} · {formatTimeRange(event.startsAt, event.endsAt)}
                </p>
                <h3>{event.title.replace(/^(Opening |Closing )?Keynote: /, '')}</h3>
                <p className="muted">
                  {speakerNames(event).join(', ')}
                  {speaker ? `, ${speaker.company}` : ''}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Six tracks</p>
              <h2>Find your sessions</h2>
            </div>
          </div>
          <div className="track-grid">
            {tracks.map((track) => (
              <Link
                key={track.value}
                href={`/schedule?track=${track.value}`}
                className="track-card"
                style={{ '--track': track.color } as React.CSSProperties}
              >
                <span className="track-card-name">{track.label}</span>
                <span className="muted">{track.count} sessions</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Tuesday, November 17</p>
            <h2>Workshop day</h2>
          </div>
          <p className="muted section-note">Hands-on, small rooms, limited seats. Full workshops keep a waitlist.</p>
        </div>
        <div className="card-grid">
          {workshops.map((event) => (
            <EventCard key={event.id} event={event} counts={counts.get(event.id)} status={mine.get(event.id)} showTime />
          ))}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container venue">
          <div>
            <p className="eyebrow eyebrow-light">The venue</p>
            <h2>{CONFERENCE.venue}</h2>
            <p>
              On the Seattle waterfront at Pier 66, with the Grand Hall looking out over Elliott Bay. Ten minutes’ walk
              from Pike Place Market and the Belltown hotels; the Link light rail stops at Westlake, a short walk away.
            </p>
            <p className="muted-light">{CONFERENCE.address}</p>
          </div>
          <ul className="venue-facts">
            <li>
              <strong>Accessible</strong> Step-free access to every room, live captions on the main stage.
            </li>
            <li>
              <strong>Quiet room</strong> Open all three days in the Sound Room annex.
            </li>
            <li>
              <strong>Food</strong> Breakfast and lunch included; tell us about dietary needs when you register.
            </li>
            <li>
              <strong>Code of conduct</strong> Applies to every space, online and off. Staff wear orange lanyards.
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
