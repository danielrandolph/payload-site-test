import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { signInAction } from '@/actions/auth'
import { ActionForm } from '@/components/ActionForm'
import { getCurrentUser } from '@/lib/payload'

export const metadata: Metadata = { title: 'Sign in' }

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next = '/account' } = await searchParams
  if (await getCurrentUser()) redirect(next.startsWith('/') && !next.startsWith('//') ? next : '/account')

  return (
    <section className="container page auth">
      <div className="auth-card">
        <h1>Sign in</h1>
        <p className="muted">Manage your registrations and build your schedule.</p>
        <ActionForm action={signInAction} submitLabel="Sign in" pendingLabel="Signing in…" className="stack-form">
          <input type="hidden" name="next" value={next} />
          <label className="field">
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" name="password" autoComplete="current-password" required />
          </label>
        </ActionForm>
        <p className="muted small center">
          Don’t have an account? <Link href={`/signup?next=${encodeURIComponent(next)}`}>Create one</Link>
        </p>
      </div>
    </section>
  )
}
