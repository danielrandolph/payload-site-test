import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { signUpAction } from '@/actions/auth'
import { ActionForm } from '@/components/ActionForm'
import { getCurrentUser } from '@/lib/payload'

export const metadata: Metadata = { title: 'Create your account' }

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next = '/schedule' } = await searchParams
  if (await getCurrentUser()) redirect('/account')

  return (
    <section className="container page auth">
      <div className="auth-card">
        <h1>Create your attendee account</h1>
        <p className="muted">
          One account for registering for sessions, joining workshop waitlists, and picking up your badge.
        </p>
        <ActionForm action={signUpAction} submitLabel="Create account" pendingLabel="Creating account…" className="stack-form">
          <input type="hidden" name="next" value={next} />
          <label className="field">
            <span>Full name</span>
            <input name="name" autoComplete="name" required maxLength={120} />
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" required />
          </label>
          <div className="field-row">
            <label className="field">
              <span>
                Company <span className="muted">(optional)</span>
              </span>
              <input name="company" autoComplete="organization" maxLength={120} />
            </label>
            <label className="field">
              <span>
                Job title <span className="muted">(optional)</span>
              </span>
              <input name="jobTitle" autoComplete="organization-title" maxLength={120} />
            </label>
          </div>
          <label className="field">
            <span>Password</span>
            <input type="password" name="password" autoComplete="new-password" minLength={8} required />
            <small className="muted">At least 8 characters.</small>
          </label>
        </ActionForm>
        <p className="muted small center">
          Already registered? <Link href={`/login?next=${encodeURIComponent(next)}`}>Sign in</Link>
        </p>
      </div>
    </section>
  )
}
