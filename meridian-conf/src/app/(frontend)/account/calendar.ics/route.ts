import { CONFERENCE } from '@/lib/program'
import { getPayloadClient } from '@/lib/payload'
import { getMyRegistrations } from '@/lib/queries'

const stamp = (iso: string) => iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '')

const escape = (text: string) => text.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1')

/** iCalendar lines must be folded at 75 octets. */
const fold = (line: string) => line.replace(/(.{74})(?=.)/g, '$1\r\n ')

export async function GET(request: Request) {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: request.headers })
  if (!user) return new Response('Sign in to download your calendar.', { status: 401 })

  const origin = new URL(request.url).origin
  const regs = (await getMyRegistrations(user)).filter((r) => r.status === 'confirmed')
  const now = stamp(new Date().toISOString())

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Meridian//Conference 2026//EN',
    'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:${CONFERENCE.name}`,
    ...regs.flatMap((r) => [
      'BEGIN:VEVENT',
      `UID:${r.reference}@meridianconf.dev`,
      `DTSTAMP:${now}`,
      `DTSTART:${stamp(r.event.startsAt)}`,
      `DTEND:${stamp(r.event.endsAt)}`,
      `SUMMARY:${escape(r.event.title)}`,
      `LOCATION:${escape(`${r.event.room}, ${CONFERENCE.venue}, ${CONFERENCE.address}`)}`,
      `DESCRIPTION:${escape(`${r.event.summary}\n\nRef ${r.reference}`)}`,
      `URL:${origin}/events/${r.event.slug}`,
      'END:VEVENT',
    ]),
    'END:VCALENDAR',
  ]

  return new Response(lines.map(fold).join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="meridian-2026.ics"',
      'Cache-Control': 'private, no-store',
    },
  })
}
