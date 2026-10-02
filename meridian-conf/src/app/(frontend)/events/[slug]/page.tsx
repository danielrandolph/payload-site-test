import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { cancelRegistrationAction, registerAction, updateNotesAction } from '@/actions/registrations'
import { ActionForm } from '@/components/ActionForm'
import { Avatar } from '@/components/Avatar'
import { TrackBadge, TypeBadge } from '@/components/Badges'
import { EventCard } from '@/components/EventCard'
import { SeatMeter } from '@/components/SeatMeter'
import { dayKey, formatDuration, formatLongDay, formatTimeRange, overlaps, paragraphs } from '@/lib/format'
import { getCurrentUser } from '@/lib/payload'
import { isRegistrable } from '@/lib/program'
import {
  getEventBySlug,
  getEvents,
  getMyRegistrations,
  getSeatCounts,
  getWaitlistPosition,
  type MyRegistration,
  type SeatCounts,
} from '@/lib/queries'
import type { Event, Speaker, User } from '@/payload-types'

type Params = { params: Promise<{ slug: string }> }

const LEVELS: Record<string, string> = { all: 'All levels', intermediate: 'Intermediate', advanced: 'Advanced' }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const event = await getEventBySlug((await params).slug)
  return event ? { title: event.title, description: event.summary } : {}
}

export default async function EventPage({ params }: Params) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) notFound()

  const [user, counts, allEvents] = await Promise.all([getCurrentUser(), getSeatCounts(event.id), getEvents()])
  const myRegs = await getMyRegistrations(user)
  const mine = myRegs.find((r) => r.event.id === event.id)
  const clashes = myRegs.filter(
    (r) => r.event.id !== event.id && r.status !== 'cancelled' && overlaps(r.event, event),
  )
  const speakers = (event.speakers ?? []).filter((s): s is Speaker => typeof s === 'object' && s !== null)
  const alternatives = allEvents.filter(
    (e) => e.id !== event.id && isRegistrable(e.type) && isRegistrable(event.type) && overlaps(e, event),
  )
  const allCounts = alternatives.length ? await getSeatCounts() : new Map<number, SeatCounts>()
  const myStatus = new Map(myRegs.map((r) => [r.event.id, r.status]))

  return (
    <article className="container page">
      <p className="breadcrumb">
        <Link href={`/schedule?day=${dayKey(event.startsAt)}`}>← Schedule</Link>
      </p>

      <header className="event-head">
        <div className="event-card-tags">
          <TypeBadge type={event.type} />
          <TrackBadge track={event.track} />
        </div>
        <h1>{event.title}</h1>
        <ul className="event-facts">
          <li>{formatLongDay(event.startsAt)}</li>
          <li>
            {formatTimeRange(event.startsAt, event.endsAt)} PT · {formatDuration(event.startsAt, event.endsAt)}
          </li>
          <li>{event.room}</li>
          {isRegistrable(event.type) && event.level ? <li>{LEVELS[event.level]}</li> : null}
        </ul>
      </header>

      <div className="event-layout">
        <div className="event-body prose">
          <p className="lede">{event.summary}</p>
          {paragraphs(event.description).map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          {event.takeaways?.length ? (
            <>
              <h2>What you’ll take away</h2>
              <ul className="takeaways">
                {event.takeaways.map((t) => (
                  <li key={t.id ?? t.text}>{t.text}</li>
                ))}
              </ul>
            </>
          ) : null}

          {event.prerequisites ? (
            <>
              <h2>Before you come</h2>
              <p>{event.prerequisites}</p>
            </>
          ) : null}

          {speakers.length ? (
            <>
              <h2>{speakers.length > 1 ? 'Speakers' : 'Speaker'}</h2>
              <ul className="speaker-list">
                {speakers.map((s) => (
                  <li key={s.id} className="speaker-row">
                    <Avatar name={s.name} accent={s.accent} size={56} />
                    <div>
                      <h3>
                        <Link href={`/speakers#${s.slug}`}>{s.name}</Link>
                      </h3>
                      <p className="muted">
                        {s.role}, {s.company}
                      </p>
                      <p>{s.bio}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        <aside className="event-aside">
          <RegistrationPanel
            event={event}
            user={user}
            registration={mine}
            counts={counts.get(event.id)}
            clashes={clashes}
            path={`/events/${event.slug}`}
          />

          {alternatives.length ? (
            <section className="aside-section">
              <h2 className="aside-title">Also in this time slot</h2>
              <div className="stack">
                {alternatives.map((e) => (
                  <EventCard key={e.id} event={e} counts={allCounts.get(e.id)} status={myStatus.get(e.id)} showTime />
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </article>
  )
}

async function RegistrationPanel({
  event,
  user,
  registration,
  counts,
  clashes,
  path,
}: {
  event: Event
  user: User | null
  registration?: MyRegistration
  counts?: SeatCounts
  clashes: MyRegistration[]
  path: string
}) {
  if (!isRegistrable(event.type)) {
    return (
      <div className="panel">
        <p className="panel-title">Open to all pass holders</p>
        <p className="muted">No registration needed.</p>
      </div>
    )
  }

  if (new Date(event.endsAt) < new Date()) {
    return (
      <div className="panel">
        <p className="panel-title">This session has ended</p>
      </div>
    )
  }

  const clashNotice = clashes.length ? (
    <div className="notice notice-warning">
      <strong>Time clash.</strong> This overlaps with{' '}
      {clashes.map((c, i) => (
        <span key={c.id}>
          {i > 0 ? ', ' : ''}
          <Link href={`/events/${c.event.slug}`}>{c.event.title}</Link>
        </span>
      ))}
      , which you’re {clashes.length > 1 ? 'also registered for' : 'registered for'}.
    </div>
  ) : null

  if (!user) {
    return (
      <div className="panel">
        <p className="panel-title">Save your seat</p>
        <SeatMeter event={event} counts={counts} />
        <Link href={`/login?next=${encodeURIComponent(path)}`} className="button button-primary button-block">
          Sign in to register
        </Link>
        <p className="muted small center">
          New to Meridian? <Link href={`/signup?next=${encodeURIComponent(path)}`}>Create an account</Link>
        </p>
      </div>
    )
  }

  if (registration && registration.status !== 'cancelled') {
    const waitlisted = registration.status === 'waitlisted'
    const position = await getWaitlistPosition(registration)
    return (
      <div className={`panel ${waitlisted ? 'panel-waitlisted' : 'panel-confirmed'}`}>
        <p className="panel-title">{waitlisted ? `You’re #${position} on the waitlist` : '✓ You’re registered'}</p>
        <p className="muted small">
          {waitlisted
            ? 'If a seat opens up we’ll move you to confirmed automatically — it’ll show on My registrations.'
            : 'Show your badge at the door. Arriving five minutes early is appreciated for workshops.'}
        </p>
        <p className="reference">
          Ref <code>{registration.reference}</code>
        </p>
        <SeatMeter event={event} counts={counts} />
        {clashNotice}
        <ActionForm
          action={updateNotesAction.bind(null, registration.id)}
          submitLabel="Save notes"
          pendingLabel="Saving…"
          variant="secondary"
        >
          <label className="field">
            <span>Notes for the organisers</span>
            <textarea name="notes" rows={3} maxLength={500} defaultValue={registration.notes ?? ''} />
          </label>
        </ActionForm>
        <ActionForm
          action={cancelRegistrationAction.bind(null, registration.id)}
          submitLabel={waitlisted ? 'Leave waitlist' : 'Cancel registration'}
          pendingLabel="Cancelling…"
          variant="danger"
          confirmMessage={`Cancel your ${waitlisted ? 'waitlist spot' : 'seat'} for “${event.title}”?`}
        />
      </div>
    )
  }

  const full = Boolean(event.capacity && (counts?.confirmed ?? 0) >= event.capacity)
  return (
    <div className="panel">
      <p className="panel-title">{full ? 'This session is full' : 'Save your seat'}</p>
      {registration?.status === 'cancelled' ? (
        <p className="muted small">You cancelled this registration. You can register again below.</p>
      ) : null}
      <SeatMeter event={event} counts={counts} />
      {clashNotice}
      <ActionForm
        action={registerAction.bind(null, event.id, path)}
        submitLabel={full ? 'Join the waitlist' : 'Register'}
        pendingLabel="Registering…"
        className="register-form"
      >
        <label className="field">
          <span>
            Notes <span className="muted">(optional)</span>
          </span>
          <textarea
            name="notes"
            rows={3}
            maxLength={500}
            placeholder="Accessibility or dietary needs, or a question for the speaker"
            defaultValue={registration?.notes ?? ''}
          />
        </label>
      </ActionForm>
    </div>
  )
}
