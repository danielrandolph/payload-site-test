import type { Metadata } from 'next'
import Link from 'next/link'

import { EventCard } from '@/components/EventCard'
import { dayKey, formatLongDay, formatTime, formatWeekday } from '@/lib/format'
import { getCurrentUser } from '@/lib/payload'
import { EVENT_TYPES, TRACKS } from '@/lib/program'
import { getEvents, getMyRegistrations, getSeatCounts } from '@/lib/queries'
import type { Event } from '@/payload-types'

export const metadata: Metadata = { title: 'Schedule' }

type Search = { day?: string; track?: string; type?: string; mine?: string }

const DAY_NAMES: Record<string, string> = {
  '2026-11-17': 'Workshops',
  '2026-11-18': 'Conference day 1',
  '2026-11-19': 'Conference day 2',
}

export default async function SchedulePage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams
  const [events, counts, user] = await Promise.all([getEvents(), getSeatCounts(), getCurrentUser()])
  const mine = new Map((await getMyRegistrations(user)).map((r) => [r.event.id, r.status]))

  const days = [...new Set(events.map((e) => dayKey(e.startsAt)))]
  const day = days.includes(params.day ?? '') ? params.day! : days[0]
  const track = TRACKS.some((t) => t.value === params.track) ? params.track : undefined
  const type = EVENT_TYPES.some((t) => t.value === params.type) ? params.type : undefined
  const onlyMine = Boolean(user && params.mine)
  const filtering = Boolean(track || type || onlyMine)

  const visible = events.filter((event) => {
    if (dayKey(event.startsAt) !== day) return false
    if (onlyMine) {
      const status = mine.get(event.id)
      return status === 'confirmed' || status === 'waitlisted'
    }
    // Keep breaks visible when browsing the full day so the timeline reads naturally.
    if (event.type === 'break') return !filtering
    if (track && event.track !== track) return false
    if (type && event.type !== type) return false
    return true
  })

  const slots = new Map<string, Event[]>()
  for (const event of visible) slots.set(event.startsAt, [...(slots.get(event.startsAt) ?? []), event])

  const href = (next: Partial<Search>) => {
    const merged = { day, track, type, mine: onlyMine ? '1' : undefined, ...next }
    const query = new URLSearchParams(
      Object.entries(merged).filter((entry): entry is [string, string] => Boolean(entry[1])),
    )
    return `/schedule?${query}`
  }

  return (
    <section className="container page">
      <header className="page-head">
        <p className="eyebrow">November 17–19 · All times Pacific</p>
        <h1>Schedule</h1>
        <p className="lede">
          Register for the sessions you plan to attend so we can size rooms and keep workshops small. You can change
          your plans any time from <Link href="/account">My registrations</Link>.
        </p>
      </header>

      <nav className="day-tabs" aria-label="Conference days">
        {days.map((d) => (
          <Link key={d} href={href({ day: d })} className="day-tab" aria-current={d === day ? 'page' : undefined}>
            <span className="day-tab-name">{formatWeekday(`${d}T20:00:00Z`)}</span>
            <span className="day-tab-sub">{DAY_NAMES[d] ?? formatLongDay(`${d}T20:00:00Z`)}</span>
          </Link>
        ))}
      </nav>

      <div className="filters" role="group" aria-label="Filter sessions">
        <div className="chip-row">
          <span className="chip-label">Track</span>
          <Link href={href({ track: '' })} className="chip" aria-current={!track ? 'true' : undefined}>
            All
          </Link>
          {TRACKS.map((t) => (
            <Link
              key={t.value}
              href={href({ track: t.value })}
              className="chip"
              aria-current={track === t.value ? 'true' : undefined}
              style={{ '--track': t.color } as React.CSSProperties}
            >
              {t.label}
            </Link>
          ))}
        </div>
        <div className="chip-row">
          <span className="chip-label">Format</span>
          <Link href={href({ type: '' })} className="chip" aria-current={!type ? 'true' : undefined}>
            All
          </Link>
          {EVENT_TYPES.filter((t) => t.value !== 'break').map((t) => (
            <Link
              key={t.value}
              href={href({ type: t.value })}
              className="chip"
              aria-current={type === t.value ? 'true' : undefined}
            >
              {t.label}
            </Link>
          ))}
          {user ? (
            <Link
              href={href({ mine: onlyMine ? '' : '1' })}
              className="chip chip-mine"
              aria-current={onlyMine ? 'true' : undefined}
            >
              {onlyMine ? '✓ ' : ''}My schedule
            </Link>
          ) : null}
        </div>
      </div>

      <h2 className="visually-hidden">{formatLongDay(`${day}T20:00:00Z`)}</h2>
      {slots.size === 0 ? (
        <div className="empty">
          <p>No sessions match these filters on {formatWeekday(`${day}T20:00:00Z`)}.</p>
          <Link href={href({ track: '', type: '', mine: '' })} className="text-link">
            Clear filters
          </Link>
        </div>
      ) : (
        <ol className="timeline">
          {[...slots.entries()].map(([start, items]) => (
            <li key={start} className="timeline-slot">
              <time className="timeline-time" dateTime={start}>
                {formatTime(start)}
              </time>
              <div className={`timeline-items ${items.length > 1 ? 'parallel' : ''}`}>
                {items.map((event) => (
                  <EventCard key={event.id} event={event} counts={counts.get(event.id)} status={mine.get(event.id)} />
                ))}
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
