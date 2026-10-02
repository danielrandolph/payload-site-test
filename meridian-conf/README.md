# Meridian 2026

Website for **Meridian 2026**, a fictional three-day technology conference (November 17–19, 2026, Seattle). Attendees browse the schedule, create an account, register for sessions, join waitlists for full workshops, and manage their registrations. Organisers manage everything in the Payload admin.

Built with **Next.js 16** and **Payload 3** (SQLite), in one app.

## Getting started

```bash
npm install
npm run dev        # runs migrations, then starts Next on :3000
```

On first boot the database seeds itself (about 15 s): 43 schedule entries, 27 speakers, 38 users, and about 400 registrations.

| Who | Email | Password |
| --- | --- | --- |
| Organiser (admin) | `organiser@meridianconf.dev` | `meridian-admin` |
| Demo attendee | `alex@example.com` | `meridian-2026` |

All other seeded attendees (`jordan.blake@example.com`, …) also use `meridian-2026`.

`npm run reset` deletes the SQLite database and re-runs migrations. The seed runs again on the next start.

## What's where

| Route | |
| --- | --- |
| `/` | Landing page: keynotes, tracks, workshops, venue |
| `/schedule` | Day tabs; filters by track, format, and "My schedule"; live seat counts |
| `/events/[slug]` | Abstract, speakers, sessions in the same slot, registration panel |
| `/speakers` | Speaker bios and their sessions |
| `/signup`, `/login` | Attendee accounts (they share Payload's auth cookie) |
| `/account` | My registrations: cancel, re-register, notes, clash warnings, badge details, `.ics` export |
| `/admin` | Payload admin, organisers only |

```
src/
  collections/    Users, Speakers, Events, Registrations (schema, access, hooks)
  actions/        Server actions for auth and registration management
  app/(frontend)/ Public site
  app/(payload)/  Payload admin and REST/GraphQL routes (generated)
  lib/            Queries, formatting, programme vocabulary (tracks, rooms, types)
  seed/           Seed content and loader
  migrations/     Database migrations
```

## Registration rules

The rules live in hooks on the `registrations` collection, so they apply equally to the website, the REST/GraphQL API, and the admin:

- An attendee can only register themselves, and can have at most one registration per event. A unique `(user, event)` index enforces this too.
- When an event reaches its `capacity`, new registrations are **waitlisted**.
- When a confirmed attendee cancels, the longest-waiting person is **promoted automatically**.
- Attendees can cancel, add notes, or re-register after cancelling (the seat check runs again). They can't move themselves off a waitlist or delete their records.
- Breaks and meals appear on the schedule but don't take registrations. Sessions that have already ended can't be registered for.
- Organisers can override any of this from the admin, for example to confirm someone past capacity.

The website flags time clashes between sessions you're registered for but doesn't block them.

## Schema changes

After editing a collection:

```bash
npm run generate:types
npx payload migrate:create <name>
```
