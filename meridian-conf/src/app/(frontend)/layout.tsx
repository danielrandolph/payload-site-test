import type { Metadata } from 'next'
import { IBM_Plex_Mono, Inter } from 'next/font/google'
import React from 'react'

import { SiteFooter, SiteHeader } from '@/components/SiteFrame'
import { CONFERENCE } from '@/lib/program'

import './styles.css'

const sans = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], display: 'swap', weight: ['400', '500'], variable: '--font-mono' })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    default: `${CONFERENCE.name} · ${CONFERENCE.dates} · ${CONFERENCE.city}`,
    template: `%s · ${CONFERENCE.name}`,
  },
  description: `${CONFERENCE.tagline} ${CONFERENCE.dates} at ${CONFERENCE.venue}, ${CONFERENCE.city}.`,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
