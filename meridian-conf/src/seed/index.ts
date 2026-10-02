import type { Payload } from 'payload'

import type { Event, Speaker, User } from '@/payload-types'

import { slugify } from '@/lib/slug'

import { attendeeNames, companies, events, jobTitles, speakers } from './content'

export const DEMO_ADMIN = { email: 'organiser@meridianconf.dev', password: 'meridian-admin' }
export const DEMO_ATTENDEE = { email: 'alex@example.com', password: 'meridian-2026' }

/** Wall-clock time in Seattle (PST, UTC−8 in November) to an ISO timestamp. */
const at = (day: string, time: string) => new Date(`${day}T${time}:00-08:00`).toISOString()

/** Small deterministic PRNG so every fresh database gets the same seed data. */
function random(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
}

export async function seed(payload: Payload) {
  const existing = await payload.count({ collection: 'events' })
  if (existing.totalDocs > 0) return

  payload.logger.info('Seeding Meridian 2026: speakers, schedule, attendees, registrations…')

  await payload.create({
    collection: 'users',
    data: { ...DEMO_ADMIN, name: 'Meridian Organiser', company: 'Meridian', role: 'admin' },
  })

  const speakerDocs = new Map<string, Speaker>()
  for (const { key, ...speaker } of speakers) {
    speakerDocs.set(key, await payload.create({ collection: 'speakers', data: { ...speaker, slug: slugify(speaker.name) } }))
  }

  const eventDocs = new Map<string, Event>()
  const repeated = (title: string) => events.filter((event) => event.title === title).length > 1
  for (const event of events) {
    const doc = await payload.create({
      collection: 'events',
      data: {
        title: event.title,
        // Meals repeat each day, so give them a dated slug.
        slug: slugify(repeated(event.title) ? `${event.title} nov ${event.day.slice(-2)}` : event.title),
        type: event.type,
        track: event.track,
        startsAt: at(event.day, event.start),
        endsAt: at(event.day, event.end),
        room: event.room,
        capacity: event.capacity,
        level: event.level ?? 'all',
        summary: event.summary,
        description: event.description,
        prerequisites: event.prerequisites,
        takeaways: event.takeaways?.map((text) => ({ text })),
        speakers: event.speakers?.map((key) => speakerDocs.get(key)!.id),
      },
    })
    // Two "Lunch" / "Breakfast" entries share a title, so key by day as well.
    eventDocs.set(`${event.day} ${event.title}`, doc)
  }
  const find = (day: string, title: string) => {
    const doc = eventDocs.get(`${day} ${title}`)
    if (!doc) throw new Error(`Seed event not found: ${day} ${title}`)
    return doc
  }

  const register = async (user: User, event: Event, notes?: string) =>
    payload.create({
      collection: 'registrations',
      data: { event: event.id, user: user.id, notes },
      user,
    })

  // ── Attendees ────────────────────────────────────────────────────────────
  const rand = random(2026)
  const attendees: User[] = []
  for (const [i, name] of attendeeNames.entries()) {
    const [first, last] = name.toLowerCase().split(' ')
    attendees.push(
      await payload.create({
        collection: 'users',
        data: {
          name,
          email: `${first}.${last}@example.com`,
          password: 'meridian-2026',
          company: companies[i % companies.length],
          jobTitle: jobTitles[(i * 5) % jobTitles.length],
          role: 'attendee',
        },
      }),
    )
  }

  // The threat-modelling lab is deliberately small: fill it and start a waitlist.
  const lab = find('2026-11-17', 'Threat Modeling Lab: From Whiteboard to Backlog')
  for (const attendee of attendees.slice(0, 12)) await register(attendee, lab)

  // Everyone else picks at most one session per time slot.
  const slots = new Map<string, Event[]>()
  for (const doc of eventDocs.values()) {
    if (doc.type === 'break' || doc.id === lab.id) continue
    slots.set(doc.startsAt, [...(slots.get(doc.startsAt) ?? []), doc])
  }
  for (const attendee of attendees) {
    for (const options of slots.values()) {
      const keynote = options.length === 1
      if (rand() > (keynote ? 0.7 : 0.45)) continue
      await register(attendee, options[Math.floor(rand() * options.length)])
    }
  }

  // ── Demo attendee with a realistic mix of registrations ──────────────────
  const alex = await payload.create({
    collection: 'users',
    data: {
      ...DEMO_ATTENDEE,
      name: 'Alex Rivera',
      company: 'Spindle',
      jobTitle: 'Senior Software Engineer',
      role: 'attendee',
    },
  })

  await register(alex, find('2026-11-18', 'Opening Keynote: The Boring Parts Are the Product'))
  await register(alex, find('2026-11-18', 'Retrieval That Doesn’t Lie: Grounding in Practice'))
  // Overlaps with the retrieval talk — the account page flags the clash.
  await register(alex, find('2026-11-18', 'View Transitions in Production'))
  await register(alex, find('2026-11-18', 'Passkeys at 40 Million Users'), 'Would love to ask about recovery flows for shared devices.')
  await register(alex, find('2026-11-18', 'Panel: Who’s Accountable When the Agent Ships the Bug?'))
  await register(alex, find('2026-11-18', 'Meridian Night at the Market'), 'Vegetarian, please.')
  await register(alex, find('2026-11-19', 'Observability for Agentic Systems'))
  await register(alex, lab)

  const clinic = await register(alex, find('2026-11-17', 'Postgres Performance Clinic'))
  await payload.update({ collection: 'registrations', id: clinic.id, data: { status: 'cancelled' }, user: alex })

  const { totalDocs } = await payload.count({ collection: 'registrations' })
  payload.logger.info(
    `Seeded ${eventDocs.size} events, ${speakerDocs.size} speakers, ${attendees.length + 2} users, ${totalDocs} registrations.`,
  )
  payload.logger.info(`Organiser login: ${DEMO_ADMIN.email} / ${DEMO_ADMIN.password}`)
  payload.logger.info(`Attendee login:  ${DEMO_ATTENDEE.email} / ${DEMO_ATTENDEE.password}`)
}
