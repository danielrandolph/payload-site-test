import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import {
  cancelRegistrationAction,
  registerAction,
  updateNotesAction,
  updateProfileAction,
} from '@/actions/registrations'
import { ActionForm } from '@/components/ActionForm'
import { StatusPill, TrackBadge, TypeBadge } from '@/components/Badges'
import { dayKey, formatLongDay, formatTimeRange, overlaps } from '@/lib/format'
import { getCurrentUser } from '@/lib/payload'
import { getMyRegistrations, getWaitlistPosition, type MyRegistration } from '@/lib/queries'

export const metadata: Metadata = { title: 'My registrations' }

export default async function AccountPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login?next=/account')

  const registrations = await getMyRegistrations(user)
  const active = registrations.filter((r) => r.status !== 'cancelled')
  const cancelled = registrations.filter((r) => r.status === 'cancelled')
  const confirmedCount = active.filter((r) => r.status === 'confirmed').length
  const waitlistedCount = active.length - confirmedCount

  const positions = new Map(
    await Promise.all(
      active.filter((r) => r.status === 'waitlisted').map(async (r) => [r.id, await getWaitlistPosition(r)] as const),
    ),
  )

  const byDay = new Map<string, MyRegistration[]>()
  for (const r of active) {
    const key = dayKey(r.event.startsAt)
    byDay.set(key, [...(byDay.get(key) ?? []), r])
  }

  return (
    <section className="container page">
      <header className="page-head account-head">
        <div>
          <p className="eyebrow">My registrations</p>
          <h1>Hi, {user.name.split(' ')[0]}</h1>
          <p className="lede">
            {active.length === 0
              ? 'You haven’t registered for any sessions yet.'
              : `You’re registered for ${confirmedCount} ${confirmedCount === 1 ? 'session' : 'sessions'}${
                  waitlistedCount ? ` and waitlisted for ${waitlistedCount}` : ''
                }.`}
          </p>
        </div>
        <div className="account-actions">
          <Link href="/schedule?mine=1" className="button button-secondary">
            View on schedule
          </Link>
          {confirmedCount ? (
            <a href="/account/calendar.ics" className="button button-secondary" download>
              Add to calendar (.ics)
            </a>
          ) : null}
        </div>
      </header>

      <div className="account-layout">
        <div>
          {active.length === 0 ? (
            <div className="empty">
              <p>Browse the programme and register for the talks and workshops you want to attend.</p>
              <Link href="/schedule" className="button button-primary">
                Browse the schedule
              </Link>
            </div>
          ) : (
            [...byDay.entries()].map(([day, regs]) => (
              <section key={day} className="account-day">
                <h2>{formatLongDay(regs[0].event.startsAt)}</h2>
                <ul className="reg-list">
                  {regs.map((r) => {
                    const clashes = active.filter((o) => o.id !== r.id && overlaps(o.event, r.event))
                    return (
                      <li key={r.id} className={`reg-item reg-${r.status}`}>
                        <div className="reg-time">{formatTimeRange(r.event.startsAt, r.event.endsAt)}</div>
                        <div className="reg-main">
                          <div className="event-card-tags">
                            <StatusPill status={r.status} />
                            <TypeBadge type={r.event.type} />
                            {r.event.track !== 'general' ? <TrackBadge track={r.event.track} /> : null}
                          </div>
                          <h3>
                            <Link href={`/events/${r.event.slug}`}>{r.event.title}</Link>
                          </h3>
                          <p className="muted small">
                            {r.event.room} · Ref <code>{r.reference}</code>
                            {r.status === 'waitlisted' && positions.get(r.id)
                              ? ` · #${positions.get(r.id)} on the waitlist`
                              : ''}
                          </p>
                          {clashes.length ? (
                            <p className="notice notice-warning small">
                              Overlaps with {clashes.map((c) => c.event.title).join(', ')}. Consider cancelling one so
                              someone else can have the seat.
                            </p>
                          ) : null}
                          <details className="reg-notes">
                            <summary>{r.notes ? 'Edit notes' : 'Add notes'}</summary>
                            <ActionForm
                              action={updateNotesAction.bind(null, r.id)}
                              submitLabel="Save notes"
                              pendingLabel="Saving…"
                              variant="secondary"
                            >
                              <label className="field">
                                <span className="visually-hidden">Notes for {r.event.title}</span>
                                <textarea
                                  name="notes"
                                  rows={2}
                                  maxLength={500}
                                  defaultValue={r.notes ?? ''}
                                  placeholder="Accessibility or dietary needs, or a question for the speaker"
                                />
                              </label>
                            </ActionForm>
                          </details>
                          {r.notes ? <p className="reg-note-preview">“{r.notes}”</p> : null}
                        </div>
                        <div className="reg-actions">
                          <ActionForm
                            action={cancelRegistrationAction.bind(null, r.id)}
                            submitLabel={r.status === 'waitlisted' ? 'Leave waitlist' : 'Cancel'}
                            pendingLabel="Cancelling…"
                            variant="danger"
                            confirmMessage={`Cancel your registration for “${r.event.title}”?`}
                          />
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))
          )}

          {cancelled.length ? (
            <section className="account-day">
              <h2>Cancelled</h2>
              <ul className="reg-list">
                {cancelled.map((r) => (
                  <li key={r.id} className="reg-item reg-cancelled">
                    <div className="reg-time">{formatTimeRange(r.event.startsAt, r.event.endsAt)}</div>
                    <div className="reg-main">
                      <h3>
                        <Link href={`/events/${r.event.slug}`}>{r.event.title}</Link>
                      </h3>
                      <p className="muted small">
                        {formatLongDay(r.event.startsAt)} · {r.event.room}
                      </p>
                    </div>
                    <div className="reg-actions">
                      <ActionForm
                        action={registerAction.bind(null, r.event.id, '/account')}
                        submitLabel="Register again"
                        pendingLabel="Registering…"
                        variant="secondary"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="panel account-profile">
          <p className="panel-title">Badge details</p>
          <p className="muted small">Printed on your badge. Email: {user.email}</p>
          <ActionForm
            action={updateProfileAction}
            submitLabel="Save details"
            pendingLabel="Saving…"
            variant="secondary"
            className="stack-form"
          >
            <label className="field">
              <span>Name</span>
              <input name="name" defaultValue={user.name} required maxLength={120} />
            </label>
            <label className="field">
              <span>Company</span>
              <input name="company" defaultValue={user.company ?? ''} maxLength={120} />
            </label>
            <label className="field">
              <span>Job title</span>
              <input name="jobTitle" defaultValue={user.jobTitle ?? ''} maxLength={120} />
            </label>
          </ActionForm>
        </aside>
      </div>
    </section>
  )
}
