import type { EventTypeValue, TrackValue } from '../lib/program'

type Room = 'Grand Hall' | 'Harbor Room' | 'Sound Room' | 'Elliott Room' | 'Lab A' | 'Lab B' | 'Terrace' | 'Atrium'

export type SeedSpeaker = {
  key: string
  name: string
  role: string
  company: string
  bio: string
  accent: string
}

export type SeedEvent = {
  title: string
  type: EventTypeValue
  track: TrackValue
  day: '2026-11-17' | '2026-11-18' | '2026-11-19'
  start: string
  end: string
  room: Room
  capacity?: number
  level?: 'all' | 'intermediate' | 'advanced'
  speakers?: string[]
  summary: string
  description?: string
  takeaways?: string[]
  prerequisites?: string
}

export const speakers: SeedSpeaker[] = [
  {
    key: 'rosa',
    name: 'Rosa Delgado',
    role: 'Co-founder & CTO',
    company: 'Fieldnote',
    accent: '#4f46e5',
    bio: 'Rosa co-founded Fieldnote, the offline-first research notebook used by 40,000 field scientists. Before that she spent nine years on storage infrastructure at a large cloud provider, where she learned to love runbooks, retries, and the word “idempotent.”',
  },
  {
    key: 'priya',
    name: 'Priya Raman',
    role: 'Staff ML Engineer',
    company: 'Lumen Health',
    accent: '#7c3aed',
    bio: 'Priya leads the model quality group at Lumen Health, where clinical summarisation features ship only after passing evaluation suites she helped design. She writes about measurement, sampling, and why “vibes” are not a release criterion.',
  },
  {
    key: 'marcus',
    name: 'Marcus Oyelaran',
    role: 'Principal SRE',
    company: 'Tessellate Cloud',
    accent: '#0369a1',
    bio: 'Marcus runs the delivery platform behind 3,000 daily deploys at Tessellate. He is a maintainer of an open-source progressive delivery controller and believes that the best on-call shift is a boring one.',
  },
  {
    key: 'hannah',
    name: 'Hannah Lindqvist',
    role: 'Security Architect',
    company: 'Northbeam Bank',
    accent: '#b91c1c',
    bio: 'Hannah built Northbeam’s threat-modelling programme from a single spreadsheet into a practice that covers every new service. She previously did application security consulting across Scandinavia and the Pacific Northwest.',
  },
  {
    key: 'diego',
    name: 'Diego Fernández',
    role: 'Accessibility Lead',
    company: 'Parcel & Pine',
    accent: '#c2410c',
    bio: 'Diego leads accessibility for Parcel & Pine’s e-commerce platform and its shared component library. He is a screen reader user and an invited expert to a W3C community group on accessible patterns.',
  },
  {
    key: 'mei',
    name: 'Mei Tanaka',
    role: 'Database Reliability Engineer',
    company: 'Ledgerline',
    accent: '#047857',
    bio: 'Mei keeps Ledgerline’s 90-terabyte Postgres fleet fast and upgradeable. She has contributed patches to pg_stat_statements and gives an annual talk about the strangest query plan she found that year.',
  },
  {
    key: 'samuel',
    name: 'Samuel Adeyemi',
    role: 'Distinguished Engineer',
    company: 'Orbital Freight',
    accent: '#a16207',
    bio: 'Samuel has spent twenty years building logistics software and the last five helping senior engineers write strategies that their organisations actually follow. He mentors staff-plus engineers through a community of practice he started in 2021.',
  },
  {
    key: 'arjun',
    name: 'Arjun Mehta',
    role: 'Search & Retrieval Lead',
    company: 'Quillstack',
    accent: '#7c3aed',
    bio: 'Arjun built the retrieval layer behind Quillstack’s documentation assistant, which answers two million developer questions a month. He previously worked on ranking for a large web search engine.',
  },
  {
    key: 'claire',
    name: 'Claire Dubois',
    role: 'Head of Platform',
    company: 'Wavecrest Payments',
    accent: '#0369a1',
    bio: 'Claire led Wavecrest’s migration to a cell-based architecture across three regions without a single customer-facing outage. She is based in Montréal and speaks about blast radius more than is socially advisable.',
  },
  {
    key: 'jonah',
    name: 'Jonah Kim',
    role: 'Senior Frontend Engineer',
    company: 'Spindle',
    accent: '#c2410c',
    bio: 'Jonah works on Spindle’s collaborative editor and its sync engine. He has shipped view transitions to millions of users and maintains a small but beloved CRDT library.',
  },
  {
    key: 'fatima',
    name: 'Fatima Al-Sayed',
    role: 'Identity Engineering Manager',
    company: 'Kitebox',
    accent: '#b91c1c',
    bio: 'Fatima leads the identity team at Kitebox, which moved 40 million accounts to passkeys over eighteen months. She cares about recovery flows, support tickets, and the people who will never read a security blog.',
  },
  {
    key: 'tomas',
    name: 'Tomás Novak',
    role: 'Staff Data Engineer',
    company: 'Rivermouth Analytics',
    accent: '#047857',
    bio: 'Tomás designs streaming pipelines for Rivermouth’s real-time retail analytics. He has opinions about watermarks, late data, and why every batch job is a streaming job that gave up.',
  },
  {
    key: 'grace',
    name: 'Grace Whitfield',
    role: 'VP of Engineering',
    company: 'Bramble',
    accent: '#a16207',
    bio: 'Grace leads a 140-person engineering organisation at Bramble. She introduced blameless reviews there after a particularly memorable outage, and has since written more than a hundred of them herself.',
  },
  {
    key: 'leon',
    name: 'Leon Brandt',
    role: 'Director of Engineering',
    company: 'Copperline',
    accent: '#a16207',
    bio: 'Leon has moved between individual contributor and management roles three times in his career. At Copperline he redesigned the hiring loop and tracked how its signals held up over two years of performance data.',
  },
  {
    key: 'aiyana',
    name: 'Aiyana Redcloud',
    role: 'ML Research Engineer',
    company: 'Tidewater Labs',
    accent: '#7c3aed',
    bio: 'Aiyana works on model compression at Tidewater Labs, getting large-model quality into budgets small enough for phones and point-of-sale devices. She previously researched speech recognition for low-resource languages.',
  },
  {
    key: 'ben',
    name: 'Ben Okafor',
    role: 'Runtime Engineer',
    company: 'Hollowtree',
    accent: '#0369a1',
    bio: 'Ben works on Hollowtree’s WebAssembly runtime, which serves several billion requests a day across its edge network. He contributes to the WASI component model and occasionally to its documentation.',
  },
  {
    key: 'sofia',
    name: 'Sofia Rossi',
    role: 'Web Performance Consultant',
    company: 'Independent',
    accent: '#c2410c',
    bio: 'Sofia helps news publishers and retailers make their sites fast on the devices their readers actually own. She has audited more than 300 production sites and keeps a cabinet of mid-range Android phones for testing.',
  },
  {
    key: 'nadia',
    name: 'Nadia Petrova',
    role: 'Open Source Security Lead',
    company: 'Keystone Foundation',
    accent: '#b91c1c',
    bio: 'Nadia works with package registries and maintainers on supply chain security at the Keystone Foundation. She helped roll out build provenance for one of the largest language ecosystems.',
  },
  {
    key: 'kenji',
    name: 'Kenji Watanabe',
    role: 'Principal Design Engineer',
    company: 'Prism Studio',
    accent: '#db2777',
    bio: 'Kenji sits between design and engineering at Prism Studio, where he leads the design system and prototypes new interaction models for creative tools. He studied industrial design before he learned to code.',
  },
  {
    key: 'elena',
    name: 'Elena Vasquez',
    role: 'Chief Information Security Officer',
    company: 'Harborlight',
    accent: '#b91c1c',
    bio: 'Elena is CISO at Harborlight, a health insurer serving four million members. She has run security programmes in healthcare and the public sector, and believes most breaches start with a confusing screen.',
  },
  {
    key: 'omar',
    name: 'Omar Haddad',
    role: 'AI Security Researcher',
    company: 'Gatekeep',
    accent: '#7c3aed',
    bio: 'Omar leads adversarial testing at Gatekeep, a security firm that red-teams LLM-powered products. He has disclosed prompt-injection vulnerabilities to more than thirty vendors.',
  },
  {
    key: 'lucy',
    name: 'Lucy Chen',
    role: 'Observability Engineer',
    company: 'Tracewell',
    accent: '#0f766e',
    bio: 'Lucy works on tracing standards at Tracewell and is an active contributor to the OpenTelemetry semantic conventions for generative AI. She has been on call for distributed systems since before they were called microservices.',
  },
  {
    key: 'rahul',
    name: 'Rahul Iyer',
    role: 'Senior Software Engineer, FinOps',
    company: 'Cumulus Retail',
    accent: '#0369a1',
    bio: 'Rahul built Cumulus Retail’s cost attribution platform, which puts a dollar figure on every pull request that touches infrastructure. He cut the company’s cloud bill by a third without a single mandate.',
  },
  {
    key: 'ingrid',
    name: 'Ingrid Solberg',
    role: 'Edge Platform Engineer',
    company: 'Fjordline',
    accent: '#047857',
    bio: 'Ingrid works on data products at Fjordline’s edge network in Oslo. She has been building approximate nearest-neighbour indexes small enough to replicate to 300 points of presence.',
  },
  {
    key: 'patrick',
    name: 'Patrick O’Neill',
    role: 'SRE Manager',
    company: 'Telemark',
    accent: '#0369a1',
    bio: 'Patrick manages the reliability team at Telemark, a messaging platform used by 9,000 businesses. He was incident commander for the outage he will describe, and has the commemorative mug.',
  },
  {
    key: 'amara',
    name: 'Amara Nwosu',
    role: 'Head of Data Platform',
    company: 'Greenleaf Grocers',
    accent: '#047857',
    bio: 'Amara leads the data platform team at Greenleaf Grocers, which serves 600 stores and a lot of very opinionated analysts. She introduced data contracts there and lived to tell the tale.',
  },
  {
    key: 'helen',
    name: 'Helen Park',
    role: 'Chief Scientist',
    company: 'Arcwright Research',
    accent: '#111827',
    bio: 'Helen leads Arcwright Research, an independent lab studying the long-term maintenance of software systems. Her group’s ten-year study of 2,000 production codebases is the largest of its kind.',
  },
]

export const events: SeedEvent[] = [
  // ─── Tuesday, November 17 — Workshop Day ────────────────────────────────
  {
    title: 'Badge Pick-up & Breakfast',
    type: 'break',
    track: 'general',
    day: '2026-11-17',
    start: '08:00',
    end: '09:00',
    room: 'Atrium',
    summary: 'Collect your badge, grab coffee and a pastry, and find your workshop room.',
  },
  {
    title: 'Building Evaluation Harnesses for LLM Features',
    type: 'workshop',
    track: 'ai',
    day: '2026-11-17',
    start: '09:00',
    end: '12:00',
    room: 'Lab A',
    capacity: 40,
    level: 'intermediate',
    speakers: ['priya'],
    summary:
      'Build an evaluation suite for a real summarisation feature — golden sets, model-graded rubrics, and regression gates that run in CI.',
    description:
      'Most teams ship LLM features by reading a handful of outputs and deciding they look fine. That works until a model upgrade or a prompt tweak quietly breaks something nobody re-checked.\n\nIn this hands-on workshop you will take a working summarisation feature and build an evaluation harness around it: assembling a golden dataset, writing deterministic checks, designing model-graded rubrics and calibrating them against human labels, and wiring the whole suite into CI so a pull request can fail on quality, not just on tests.',
    takeaways: [
      'How to build and maintain a golden dataset that reflects production traffic',
      'When model-graded evaluation is trustworthy — and how to check',
      'A CI pattern for blocking quality regressions before they ship',
    ],
    prerequisites:
      'A laptop with Python 3.11+ and Docker. Comfort reading Python. API credits are provided on the day.',
  },
  {
    title: 'Progressive Delivery on Kubernetes, Hands-on',
    type: 'workshop',
    track: 'platform',
    day: '2026-11-17',
    start: '09:00',
    end: '12:00',
    room: 'Lab B',
    capacity: 36,
    level: 'intermediate',
    speakers: ['marcus'],
    summary:
      'Set up canary releases with automated analysis and rollback on a live cluster, then try to break them.',
    description:
      'Every attendee gets a dedicated cluster with a small microservice application already running. Over three hours we will add a progressive delivery controller, define canary steps, hook up metric-based analysis, and practise automated rollback.\n\nThe second half is adversarial: your neighbour will inject latency, errors, and bad configuration into your release, and you will tune your analysis until it catches them without paging anyone for noise.',
    takeaways: [
      'A working canary pipeline you can take back to your team',
      'How to choose analysis metrics that catch real regressions',
      'Rollback patterns for database migrations and feature flags',
    ],
    prerequisites: 'A laptop with kubectl installed. Basic familiarity with Kubernetes deployments and services.',
  },
  {
    title: 'Threat Modeling Lab: From Whiteboard to Backlog',
    type: 'workshop',
    track: 'security',
    day: '2026-11-17',
    start: '09:30',
    end: '11:30',
    room: 'Elliott Room',
    capacity: 10,
    level: 'all',
    speakers: ['hannah'],
    summary:
      'A small-group, facilitated session: threat model a realistic payments service and turn the findings into tickets your team will actually pick up.',
    description:
      'Threat modelling has a reputation for being slow, academic, and owned by the security team. Hannah’s approach at Northbeam takes ninety minutes, is run by the engineers who own the service, and ends with a prioritised backlog.\n\nThis lab is deliberately small. You will work in pairs on a realistic payments service — data flow diagram, trust boundaries, STRIDE prompts — and practise the facilitation moves that keep a session moving. Seats are limited to keep it interactive; join the waitlist if it’s full.',
    takeaways: [
      'A lightweight, repeatable threat-modelling format',
      'Facilitation techniques for engineers, not security specialists',
      'How to write mitigations as backlog items with clear owners',
    ],
    prerequisites: 'None. Bring a laptop or a notebook.',
  },
  {
    title: 'Lunch',
    type: 'break',
    track: 'general',
    day: '2026-11-17',
    start: '12:00',
    end: '13:00',
    room: 'Atrium',
    summary: 'Lunch is served in the Atrium. Vegetarian, vegan, gluten-free, and halal options are labelled.',
  },
  {
    title: 'Accessible Components from Scratch',
    type: 'workshop',
    track: 'web',
    day: '2026-11-17',
    start: '13:00',
    end: '16:00',
    room: 'Lab A',
    capacity: 40,
    level: 'all',
    speakers: ['diego'],
    summary:
      'Build a combobox, a dialog, and a tab set that work with a keyboard and a screen reader — and learn to test them the way real users will.',
    description:
      'Component libraries promise accessibility, but the hard parts — focus management, live announcements, the many ways people navigate — are where most of them fall short.\n\nWorking in plain HTML, CSS, and a little JavaScript, you will build three notoriously tricky components from first principles. Diego will demonstrate each with a screen reader, and you will learn to do the same, so you can test your own work with confidence.',
    takeaways: [
      'Focus management patterns for dialogs and composite widgets',
      'How to test with VoiceOver and NVDA in under five minutes',
      'Which ARIA attributes matter and which ones make things worse',
    ],
    prerequisites: 'A laptop with a modern browser. Headphones are recommended for screen reader testing.',
  },
  {
    title: 'Postgres Performance Clinic',
    type: 'workshop',
    track: 'data',
    day: '2026-11-17',
    start: '13:00',
    end: '16:00',
    room: 'Lab B',
    capacity: 36,
    level: 'advanced',
    speakers: ['mei'],
    summary:
      'Bring your slowest query. Learn to read EXPLAIN ANALYZE fluently, then work through real-world performance problems on a 200 GB dataset.',
    description:
      'The first hour is a deep dive into query plans: how the planner estimates, where those estimates go wrong, and what the buffers and timing lines are really telling you.\n\nFor the remaining two hours you will work through a series of increasingly devious performance problems on a realistic dataset — bloated indexes, correlated columns, lock contention, and a JSONB column that has seen things. Anonymised plans from attendees’ own systems are welcome for the final half-hour.',
    takeaways: [
      'Reading EXPLAIN (ANALYZE, BUFFERS) without guesswork',
      'Diagnosing bad row estimates and fixing them with extended statistics',
      'Finding lock contention and bloat before they find you',
    ],
    prerequisites: 'Comfort with SQL. A laptop with psql or any Postgres client; databases are provided.',
  },
  {
    title: 'Writing Technical Strategy as a Staff+ Engineer',
    type: 'workshop',
    track: 'leadership',
    day: '2026-11-17',
    start: '13:30',
    end: '15:30',
    room: 'Elliott Room',
    capacity: 30,
    level: 'advanced',
    speakers: ['samuel'],
    summary:
      'A structured writing workshop: draft a one-page technical strategy for a real problem in your organisation and get feedback from peers.',
    description:
      'Strategy documents fail when they are too long, too vague, or written for an audience that never reads them. Samuel will share a format refined over five years of mentoring staff engineers: diagnosis, guiding policy, and coherent actions, on a single page.\n\nYou will leave with a first draft for a problem you actually have, sharpened by two rounds of structured peer review.',
    takeaways: [
      'A one-page strategy template that gets read',
      'How to write a diagnosis that leadership agrees with',
      'Techniques for building consensus before the document circulates',
    ],
    prerequisites: 'Come with a technical problem in your organisation that needs a direction.',
  },
  {
    title: 'Welcome Reception on the Terrace',
    type: 'networking',
    track: 'general',
    day: '2026-11-17',
    start: '17:30',
    end: '19:30',
    room: 'Terrace',
    capacity: 400,
    summary:
      'Kick off Meridian with drinks, small plates, and a view of Elliott Bay. Speakers and organisers will be there.',
    description:
      'Our welcome reception is open to all conference pass holders. Registration helps us plan catering — it isn’t required to attend, but please let us know if you’re coming.\n\nNon-alcoholic drinks are always available. The Terrace is covered and heated, but it’s November in Seattle, so bring a jacket.',
  },

  // ─── Wednesday, November 18 — Conference Day 1 ──────────────────────────
  {
    title: 'Breakfast',
    type: 'break',
    track: 'general',
    day: '2026-11-18',
    start: '08:00',
    end: '09:00',
    room: 'Atrium',
    summary: 'Hot breakfast and coffee in the Atrium. Badge pick-up stays open until 10:00.',
  },
  {
    title: 'Opening Keynote: The Boring Parts Are the Product',
    type: 'keynote',
    track: 'general',
    day: '2026-11-18',
    start: '09:00',
    end: '09:45',
    room: 'Grand Hall',
    capacity: 1200,
    speakers: ['rosa'],
    summary:
      'Retries, backups, migrations, and error messages are what users actually experience. Rosa Delgado on why reliability work is product work.',
    description:
      'When Fieldnote’s users lose signal in a rainforest or a research station, they don’t care about the model behind the search bar. They care that their notes are still there when they get back.\n\nRosa will argue that the unglamorous parts of software — sync, storage, upgrades, and the words on an error screen — are where trust is won or lost, and share how a small team built a culture that treats them as first-class product work.',
    takeaways: [
      'Why reliability is a product decision, not an infrastructure one',
      'How to make invisible work visible on a roadmap',
      'Lessons from building offline-first software for extreme environments',
    ],
  },
  {
    title: 'Retrieval That Doesn’t Lie: Grounding in Practice',
    type: 'talk',
    track: 'ai',
    day: '2026-11-18',
    start: '10:00',
    end: '10:40',
    room: 'Harbor Room',
    capacity: 300,
    level: 'intermediate',
    speakers: ['arjun'],
    summary:
      'What two million questions a month taught Quillstack about chunking, hybrid search, citations, and knowing when to say “I don’t know.”',
    description:
      'Retrieval-augmented generation is easy to demo and hard to get right. Arjun will walk through the changes that most improved answer accuracy for Quillstack’s documentation assistant — and the popular techniques that made no measurable difference.\n\nExpect real numbers: how chunking strategy affected recall, why hybrid lexical and vector search beat either alone, and how forcing citations reduced unsupported claims by more than half.',
    takeaways: [
      'Chunking and indexing choices that measurably matter',
      'How to evaluate retrieval separately from generation',
      'Designing answers that cite their sources and abstain when unsure',
    ],
  },
  {
    title: 'Our Year of Cell-Based Architecture',
    type: 'talk',
    track: 'platform',
    day: '2026-11-18',
    start: '10:00',
    end: '10:40',
    room: 'Sound Room',
    capacity: 250,
    level: 'advanced',
    speakers: ['claire'],
    summary:
      'How Wavecrest Payments split a monolithic deployment into isolated cells across three regions — routing, data placement, and the migrations nobody saw.',
    description:
      'A single bad deploy at Wavecrest once took down payments for every merchant at once. Cell-based architecture promised to cap that blast radius at a few percent of traffic. Delivering it took a year.\n\nClaire will cover how they chose cell boundaries, built a thin routing layer, moved merchants between cells without downtime, and what they would do differently.',
    takeaways: [
      'How to choose a partition key for cells',
      'Zero-downtime techniques for moving tenants between cells',
      'The operational costs that cell architectures add',
    ],
  },
  {
    title: 'View Transitions in Production',
    type: 'talk',
    track: 'web',
    day: '2026-11-18',
    start: '10:00',
    end: '10:40',
    room: 'Elliott Room',
    capacity: 200,
    level: 'intermediate',
    speakers: ['jonah'],
    summary:
      'Cross-document view transitions are supported everywhere now. Here’s what happened when Spindle shipped them to millions of users.',
    description:
      'Smooth navigation used to require a single-page app. With view transitions now supported across major browsers, multi-page sites can animate between pages natively.\n\nJonah will share Spindle’s rollout: the performance budget they set, the accessibility considerations around reduced motion, the bugs they hit in real browsers, and the measurable effect on engagement.',
    takeaways: [
      'Same-document versus cross-document transitions and when to use each',
      'Respecting reduced-motion preferences without losing context',
      'Measuring the performance impact of transitions',
    ],
  },
  {
    title: 'Morning Break',
    type: 'break',
    track: 'general',
    day: '2026-11-18',
    start: '10:40',
    end: '11:00',
    room: 'Atrium',
    summary: 'Coffee, tea, and snacks. Sponsor booths are open in the Atrium.',
  },
  {
    title: 'Passkeys at 40 Million Users',
    type: 'talk',
    track: 'security',
    day: '2026-11-18',
    start: '11:00',
    end: '11:40',
    room: 'Harbor Room',
    capacity: 300,
    level: 'all',
    speakers: ['fatima'],
    summary:
      'Kitebox moved its entire user base to passkeys in eighteen months. The cryptography was the easy part; account recovery was not.',
    description:
      'Passkeys eliminate phishing and password reuse, but a large consumer migration surfaces every edge case: shared family devices, lost phones, enterprise-managed browsers, and users who have never heard the word.\n\nFatima will share Kitebox’s adoption curve, the copy changes that doubled enrolment, how they redesigned account recovery without reintroducing weak links, and what happened to support ticket volume.',
    takeaways: [
      'An incremental rollout plan for passkeys',
      'Recovery flow designs that don’t undermine phishing resistance',
      'Metrics to track during an authentication migration',
    ],
  },
  {
    title: 'Streaming Joins Without Tears',
    type: 'talk',
    track: 'data',
    day: '2026-11-18',
    start: '11:00',
    end: '11:40',
    room: 'Sound Room',
    capacity: 250,
    level: 'advanced',
    speakers: ['tomas'],
    summary:
      'Late data, out-of-order events, and state that grows forever. A practical guide to joining streams correctly.',
    description:
      'Joining two streams sounds simple until an event arrives three hours late, or one side of the join goes quiet and your state store fills the disk.\n\nTomás will build up a mental model of watermarks, windows, and state retention, then walk through Rivermouth’s production patterns for interval joins, temporal table joins, and the occasional decision to just use a batch job instead.',
    takeaways: [
      'A clear mental model of watermarks and lateness',
      'Choosing between interval, window, and temporal joins',
      'Keeping join state bounded in production',
    ],
  },
  {
    title: 'The Incident Review Nobody Wanted to Write',
    type: 'talk',
    track: 'leadership',
    day: '2026-11-18',
    start: '11:00',
    end: '11:40',
    room: 'Elliott Room',
    capacity: 200,
    level: 'all',
    speakers: ['grace'],
    summary:
      'What happens when the root cause of an outage is a leadership decision? Grace Whitfield on writing blameless reviews that include the people in charge.',
    description:
      'Blameless incident reviews are good at finding technical contributing factors. They are much worse at examining staffing, deadlines, and priorities — the decisions made by the people who usually commission the review.\n\nGrace will tell the story of a review at Bramble that named her own decisions as contributing factors, what it cost, what it changed, and how to create the conditions for that kind of honesty.',
    takeaways: [
      'How to include organisational factors in incident reviews',
      'Signals that your review process has become performative',
      'Practical steps leaders can take to model accountability',
    ],
  },
  {
    title: 'Panel: Who’s Accountable When the Agent Ships the Bug?',
    type: 'panel',
    track: 'ai',
    day: '2026-11-18',
    start: '11:50',
    end: '12:30',
    room: 'Grand Hall',
    capacity: 1200,
    speakers: ['lucy', 'samuel', 'aiyana', 'omar'],
    summary:
      'Coding agents now open a meaningful share of pull requests. Four practitioners on review, ownership, and liability when the author isn’t a person.',
    description:
      'As coding agents move from autocomplete to opening and merging changes, teams are rewriting their assumptions about code review, ownership, and on-call responsibility.\n\nOur panel brings together perspectives from observability, engineering leadership, ML research, and security to discuss what has changed in practice, what hasn’t, and where the hard questions still are. Lucy Chen moderates; audience questions are welcome.',
  },
  {
    title: 'Lunch',
    type: 'break',
    track: 'general',
    day: '2026-11-18',
    start: '12:30',
    end: '13:30',
    room: 'Atrium',
    summary: 'Lunch in the Atrium. Topic tables are marked for each track if you’d like to talk shop.',
  },
  {
    title: 'Small Models, Big Wins: Distillation for Latency',
    type: 'talk',
    track: 'ai',
    day: '2026-11-18',
    start: '13:30',
    end: '14:10',
    room: 'Harbor Room',
    capacity: 300,
    level: 'advanced',
    speakers: ['aiyana'],
    summary:
      'How Tidewater Labs distilled a frontier-model classifier into a model small enough for a point-of-sale terminal — and kept 97% of the quality.',
    description:
      'Not every feature can afford a round trip to a large hosted model. For a retail client, Tidewater needed sub-50 ms classification on hardware with no GPU and an intermittent connection.\n\nAiyana will walk through dataset generation from a teacher model, student architecture choices, quantisation, and the evaluation methodology that convinced the client the small model was good enough to ship.',
    takeaways: [
      'When distillation is worth the effort',
      'Generating high-quality training data from a teacher model',
      'Quantisation trade-offs for CPU-only deployment',
    ],
  },
  {
    title: 'WebAssembly on the Server, Two Years In',
    type: 'talk',
    track: 'platform',
    day: '2026-11-18',
    start: '13:30',
    end: '14:10',
    room: 'Sound Room',
    capacity: 250,
    level: 'intermediate',
    speakers: ['ben'],
    summary:
      'Cold starts in microseconds, real sandboxing, and a component model that finally works. What’s good, what’s missing, and who should switch.',
    description:
      'Hollowtree has run customer code in WebAssembly at the edge for two years. Ben will share production data on cold starts, memory density, and isolation, and compare the operational experience with containers and V8 isolates.\n\nHe’ll also be candid about the gaps: debugging, language support, and the ecosystem libraries that still assume a POSIX world.',
    takeaways: [
      'Where WebAssembly beats containers today, with numbers',
      'What the WASI component model makes possible',
      'A checklist for evaluating Wasm for your workload',
    ],
  },
  {
    title: 'The 14 KB Budget: Performance Archaeology',
    type: 'talk',
    track: 'web',
    day: '2026-11-18',
    start: '13:30',
    end: '14:10',
    room: 'Elliott Room',
    capacity: 200,
    level: 'intermediate',
    speakers: ['sofia'],
    summary:
      'Digging through 300 production audits to find what really slows sites down on a mid-range phone — and the fixes with the best return.',
    description:
      'Sofia has audited hundreds of production sites, from national newspapers to small retailers. The same handful of problems appear again and again, and they are rarely the ones teams are working on.\n\nThis talk is a tour of the data: the real cost of third-party scripts, hydration, web fonts, and oversized images on the median device, and the changes that reliably moved Core Web Vitals.',
    takeaways: [
      'The most common causes of poor INP and LCP in the wild',
      'How to audit a site on real low-end hardware',
      'Making the case for performance work with business metrics',
    ],
  },
  {
    title: 'Supply Chain Provenance with SLSA and Sigstore',
    type: 'talk',
    track: 'security',
    day: '2026-11-18',
    start: '14:20',
    end: '15:00',
    room: 'Harbor Room',
    capacity: 300,
    level: 'intermediate',
    speakers: ['nadia'],
    summary:
      'Build provenance is now on by default in major package registries. What it protects against, what it doesn’t, and how to verify it in your pipeline.',
    description:
      'After a run of high-profile package compromises, registries have started attaching signed build provenance to published artifacts. Nadia helped roll this out and will explain what the attestations actually prove.\n\nShe’ll demonstrate verifying provenance for your dependencies in CI, generating it for your own releases, and the attacks that remain out of scope.',
    takeaways: [
      'What SLSA build levels mean in practice',
      'Verifying signed provenance for dependencies in CI',
      'Threats that provenance does not address',
    ],
  },
  {
    title: 'Lakehouse or Warehouse? Choosing in 2026',
    type: 'talk',
    track: 'data',
    day: '2026-11-18',
    start: '14:20',
    end: '15:00',
    room: 'Sound Room',
    capacity: 250,
    level: 'all',
    speakers: ['tomas'],
    summary:
      'Open table formats have matured and warehouses have opened up. A vendor-neutral framework for deciding where your analytical data should live.',
    description:
      'The line between data lakes and warehouses has blurred: warehouses read open table formats, and lakehouses offer warehouse-grade SQL. That makes the choice harder, not easier.\n\nTomás will present a decision framework based on workload shape, team skills, governance requirements, and cost, illustrated with three real migrations — including one that went back.',
    takeaways: [
      'The real differences that remain between lakehouses and warehouses',
      'A decision framework you can apply to your own workloads',
      'Migration pitfalls and how to avoid them',
    ],
  },
  {
    title: 'Hiring Loops That Predict Something',
    type: 'talk',
    track: 'leadership',
    day: '2026-11-18',
    start: '14:20',
    end: '15:00',
    room: 'Elliott Room',
    capacity: 200,
    level: 'all',
    speakers: ['leon'],
    summary:
      'Copperline compared two years of interview scores against on-the-job performance. Some signals held up. Many didn’t.',
    description:
      'Most engineering interview processes are designed by intuition and never validated. Leon’s team at Copperline went back and checked, correlating interview signals with performance and retention over two years.\n\nHe’ll share which interview formats predicted success, which introduced bias without adding signal, and how they redesigned the loop as a result.',
    takeaways: [
      'How to validate your interview process with your own data',
      'Interview formats with the strongest predictive signal',
      'Reducing bias without lowering the bar',
    ],
  },
  {
    title: 'Afternoon Break',
    type: 'break',
    track: 'general',
    day: '2026-11-18',
    start: '15:00',
    end: '15:30',
    room: 'Atrium',
    summary: 'Coffee and snacks in the Atrium.',
  },
  {
    title: 'Keynote: Interfaces for Intent',
    type: 'keynote',
    track: 'general',
    day: '2026-11-18',
    start: '15:30',
    end: '16:15',
    room: 'Grand Hall',
    capacity: 1200,
    speakers: ['kenji'],
    summary:
      'When software can act on what we mean, not just what we click, what should an interface look like? Kenji Watanabe on designing for delegation.',
    description:
      'For forty years, interfaces have been about direct manipulation: point at a thing, change it. Increasingly, users describe outcomes and software decides the steps.\n\nKenji will share prototypes from Prism Studio exploring how to show a plan before it runs, how to make AI-driven changes reviewable and reversible, and why the undo button may be the most important feature of the next decade.',
    takeaways: [
      'Design patterns for previewing and reviewing delegated work',
      'Making automated actions legible and reversible',
      'Where direct manipulation still wins',
    ],
  },
  {
    title: 'Meridian Night at the Market',
    type: 'networking',
    track: 'general',
    day: '2026-11-18',
    start: '18:30',
    end: '21:30',
    room: 'Atrium',
    capacity: 600,
    summary:
      'Our main social evening: local food vendors, a live band, lightning demos, and a quiet room for those who need one.',
    description:
      'Meridian Night brings a selection of Seattle food vendors into the Atrium for an evening of food and conversation. Expect a live band from 19:30, five-minute lightning demos on the side stage, and a dedicated quiet room.\n\nRegistration is required for catering numbers. Your conference badge is your ticket.',
  },

  // ─── Thursday, November 19 — Conference Day 2 ───────────────────────────
  {
    title: 'Breakfast',
    type: 'break',
    track: 'general',
    day: '2026-11-19',
    start: '08:30',
    end: '09:15',
    room: 'Atrium',
    summary: 'Breakfast and coffee in the Atrium.',
  },
  {
    title: 'Keynote: Security Is a UX Problem',
    type: 'keynote',
    track: 'general',
    day: '2026-11-19',
    start: '09:15',
    end: '10:00',
    room: 'Grand Hall',
    capacity: 1200,
    speakers: ['elena'],
    summary:
      'Most breaches begin with a person making a reasonable decision on a confusing screen. Elena Vasquez on designing security people can use.',
    description:
      'Harborlight’s incident data tells a consistent story: the most damaging events started with a well-meaning employee or customer misunderstanding what a screen was asking them to do.\n\nElena will share examples from healthcare and government — consent prompts, permission dialogs, warning fatigue — and the design changes that measurably reduced risk, often more than any new security tool.',
    takeaways: [
      'Why warning fatigue is a security vulnerability',
      'Using incident data to prioritise usability fixes',
      'How security and design teams can work together effectively',
    ],
  },
  {
    title: 'Observability for Agentic Systems',
    type: 'talk',
    track: 'ai',
    day: '2026-11-19',
    start: '10:15',
    end: '10:55',
    room: 'Harbor Room',
    capacity: 300,
    level: 'intermediate',
    speakers: ['lucy'],
    summary:
      'An agent made 47 tool calls and gave the wrong answer. Can you tell which step went wrong? Tracing, evaluation, and cost tracking for multi-step AI systems.',
    description:
      'Traditional request tracing assumes a predictable call graph. Agentic systems decide their own steps, loop, retry, and branch — and a single user request can involve dozens of model and tool calls.\n\nLucy will show how to apply the emerging OpenTelemetry conventions for generative AI, attach evaluation scores to spans, track cost per task, and build dashboards that help you debug behaviour rather than just latency.',
    takeaways: [
      'Instrumenting agent runs with OpenTelemetry GenAI conventions',
      'Linking evaluation results to individual traces',
      'Cost and token attribution per user task',
    ],
  },
  {
    title: 'Cost-Aware Engineering: FinOps for Developers',
    type: 'talk',
    track: 'platform',
    day: '2026-11-19',
    start: '10:15',
    end: '10:55',
    room: 'Sound Room',
    capacity: 250,
    level: 'all',
    speakers: ['rahul'],
    summary:
      'Cumulus Retail cut its cloud bill by a third by showing engineers the cost of their changes in the pull request. No mandates required.',
    description:
      'Cloud costs are usually managed by a central team chasing engineers with spreadsheets. Cumulus Retail tried something different: put the estimated monthly cost of every infrastructure change directly in the pull request, next to the tests.\n\nRahul will show how they built cost attribution, the cultural effects of making cost visible, and the surprising places savings came from.',
    takeaways: [
      'Building cost estimates into code review',
      'Tagging and attribution strategies that hold up',
      'Changing behaviour through visibility rather than policy',
    ],
  },
  {
    title: 'Local-First Apps with CRDTs',
    type: 'talk',
    track: 'web',
    day: '2026-11-19',
    start: '10:15',
    end: '10:55',
    room: 'Elliott Room',
    capacity: 200,
    level: 'advanced',
    speakers: ['jonah'],
    summary:
      'Instant UI, offline support, and real-time collaboration from one architecture. What it takes to build a local-first app in 2026.',
    description:
      'Local-first software keeps the primary copy of data on the user’s device and syncs in the background. The result is an app that feels instant and works offline, but it changes almost every assumption about state, auth, and migrations.\n\nJonah will build a small collaborative app live using CRDTs, then discuss the hard problems Spindle faced in production: schema evolution, permissions, and storage growth.',
    takeaways: [
      'How CRDTs resolve conflicts without a central server',
      'Schema migration strategies for local-first data',
      'Handling permissions when every client has a copy',
    ],
  },
  {
    title: 'Red-Teaming Your Own LLM Features',
    type: 'talk',
    track: 'security',
    day: '2026-11-19',
    start: '11:05',
    end: '11:45',
    room: 'Harbor Room',
    capacity: 300,
    level: 'intermediate',
    speakers: ['omar'],
    summary:
      'Prompt injection, data exfiltration through tools, and jailbreaks that work on production systems — plus a lightweight red-team process your team can run.',
    description:
      'Omar’s team has disclosed vulnerabilities to more than thirty vendors shipping LLM features. The same patterns recur: untrusted content treated as instructions, tools with too much authority, and output rendered without sanitisation.\n\nHe’ll demonstrate real (disclosed and fixed) attack chains, then share a one-day red-team exercise format that product teams can run themselves before launch.',
    takeaways: [
      'The most common vulnerability classes in LLM-powered products',
      'Designing tool permissions with least privilege',
      'A repeatable pre-launch red-team exercise',
    ],
  },
  {
    title: 'Vector Search at the Edge',
    type: 'talk',
    track: 'data',
    day: '2026-11-19',
    start: '11:05',
    end: '11:45',
    room: 'Sound Room',
    capacity: 250,
    level: 'advanced',
    speakers: ['ingrid'],
    summary:
      'Replicating approximate nearest-neighbour indexes to 300 points of presence: compression, consistency, and the recall you give up.',
    description:
      'Semantic search usually means a round trip to a centralised vector database. Fjordline wanted results in under 10 ms worldwide, which meant putting the index at the edge.\n\nIngrid will explain the index compression techniques that made replication feasible, how they handle updates and consistency, and the precise recall trade-offs they measured.',
    takeaways: [
      'Index compression with product quantisation',
      'Consistency models for replicated search indexes',
      'Measuring recall versus latency honestly',
    ],
  },
  {
    title: 'From Tech Lead to Manager and Back Again',
    type: 'talk',
    track: 'leadership',
    day: '2026-11-19',
    start: '11:05',
    end: '11:45',
    room: 'Elliott Room',
    capacity: 200,
    level: 'all',
    speakers: ['leon'],
    summary:
      'Leon Brandt has switched between management and IC roles three times. A candid look at the pendulum, and how organisations can make it safe to swing.',
    description:
      'Moving into management is often treated as a one-way promotion. Moving back is treated as a failure. Neither framing serves engineers or the organisations they work in.\n\nLeon will share what he learned from each transition, how Copperline redesigned its career ladder to support movement in both directions, and advice for anyone considering the switch.',
    takeaways: [
      'Signals that it’s time to switch tracks',
      'How to negotiate a transition with your manager',
      'Career ladder designs that support two-way movement',
    ],
  },
  {
    title: 'Lunch & Birds of a Feather',
    type: 'break',
    track: 'general',
    day: '2026-11-19',
    start: '11:45',
    end: '12:45',
    room: 'Atrium',
    summary: 'Lunch in the Atrium. Pick up a sign at the information desk to host your own topic table.',
  },
  {
    title: 'Panel: Paying for Open Source',
    type: 'panel',
    track: 'general',
    day: '2026-11-19',
    start: '12:45',
    end: '13:30',
    room: 'Grand Hall',
    capacity: 1200,
    speakers: ['nadia', 'ben', 'mei', 'rosa'],
    summary:
      'Maintainers and the companies that depend on them on funding, security expectations, and what a fair deal looks like in 2026.',
    description:
      'New regulations are putting security obligations on software that depends on open source, while many maintainers remain unpaid. Our panel brings together a foundation security lead, two maintainers, and a CTO whose company depends on their work.\n\nNadia Petrova moderates a frank conversation about what has changed, what companies owe, and practical funding models that work.',
  },
  {
    title: 'Postmortem: The Day DNS Took Us Down',
    type: 'talk',
    track: 'platform',
    day: '2026-11-19',
    start: '13:45',
    end: '14:25',
    room: 'Sound Room',
    capacity: 250,
    level: 'intermediate',
    speakers: ['patrick'],
    summary:
      'A four-hour outage, a cache TTL nobody remembered setting, and the recovery plan that depended on the system that was down.',
    description:
      'In March, Telemark’s messaging platform went dark for four hours. The trigger was a routine DNS change; the duration came from a circular dependency in the recovery tooling.\n\nPatrick was incident commander. He’ll walk through the timeline minute by minute, the decisions made under pressure, and the changes Telemark made to ensure their tools for fixing outages don’t depend on the things that break.',
    takeaways: [
      'Finding circular dependencies in your recovery path',
      'DNS failure modes that catch experienced teams',
      'Running incident command for a multi-hour outage',
    ],
  },
  {
    title: 'Design Systems That Survive Reorgs',
    type: 'talk',
    track: 'web',
    day: '2026-11-19',
    start: '13:45',
    end: '14:25',
    room: 'Elliott Room',
    capacity: 200,
    level: 'all',
    speakers: ['kenji'],
    summary:
      'Most design systems die when their team is reorganised. How Prism Studio built one that has outlived four org charts.',
    description:
      'Design systems are usually funded as a project and staffed by a small central team. When priorities shift, the team is disbanded and the system decays.\n\nKenji will share the governance model, contribution workflow, and technical architecture that have kept Prism Studio’s system healthy through four reorganisations — including how to measure adoption in a way leadership cares about.',
    takeaways: [
      'Governance models that don’t depend on a single team',
      'Token architecture that scales across products',
      'Adoption metrics that make the case for investment',
    ],
  },
  {
    title: 'Data Contracts in Practice',
    type: 'talk',
    track: 'data',
    day: '2026-11-19',
    start: '13:45',
    end: '14:25',
    room: 'Harbor Room',
    capacity: 300,
    level: 'intermediate',
    speakers: ['amara'],
    summary:
      'Greenleaf Grocers stopped breaking dashboards by making producers own their schemas. The tooling took a month; the negotiation took a year.',
    description:
      'When a product team renames a column, analysts often find out from a broken dashboard. Data contracts make the interface between producers and consumers explicit and enforceable.\n\nAmara will share how Greenleaf introduced contracts across 40 producing teams: the schema and quality checks enforced in CI, the incentives that got producers to participate, and the cases where they deliberately chose not to use contracts.',
    takeaways: [
      'What belongs in a data contract and what doesn’t',
      'Enforcing contracts in CI for producing services',
      'Getting buy-in from teams that don’t consume their own data',
    ],
  },
  {
    title: 'Closing Keynote: What We’ll Still Be Maintaining in 2036',
    type: 'keynote',
    track: 'general',
    day: '2026-11-19',
    start: '14:40',
    end: '15:30',
    room: 'Grand Hall',
    capacity: 1200,
    speakers: ['helen'],
    summary:
      'Arcwright Research followed 2,000 codebases for ten years. Helen Park on what survives, what rots, and what that means for the code we write today.',
    description:
      'Every engineer has opinions about which code ages well. Arcwright Research has data: a decade-long study of two thousand production codebases across industries, tracking change, defects, and the people who maintained them.\n\nHelen will close Meridian 2026 with the study’s most surprising findings — about dependencies, tests, documentation, and team turnover — and what they suggest about building software that will still be worth maintaining in ten years.',
    takeaways: [
      'Which code characteristics predicted long-term maintainability',
      'The role of team continuity in software health',
      'Practical habits supported by a decade of evidence',
    ],
  },
]

export const attendeeNames = [
  'Jordan Blake', 'Ana Souza', 'Wei Zhang', 'Chloe Martin', 'Kwame Asante', 'Isabel Moreno',
  'Ethan Brooks', 'Leila Haddad', 'Noah Fischer', 'Zara Ahmed', 'Mateo Rossi', 'Hana Kobayashi',
  'Oliver Grant', 'Amina Yusuf', 'Lucas Weber', 'Maya Patel', 'Daniel Cho', 'Freya Larsen',
  'Gabriel Silva', 'Nora Ibrahim', 'Sam Taylor', 'Ruby Nguyen', 'Felix Wagner', 'Layla Hassan',
  'Theo Laurent', 'Aisha Bello', 'Kai Andersen', 'Elif Demir', 'Jamal Wright', 'Sara Lindgren',
  'Victor Huang', 'Imani Johnson', 'Rafael Costa', 'Mila Novak', 'Owen Murphy', 'Yasmin Farah',
]

export const companies = [
  'Spindle', 'Ledgerline', 'Northbeam Bank', 'Tessellate Cloud', 'Quillstack', 'Bramble',
  'Copperline', 'Fjordline', 'Greenleaf Grocers', 'Kitebox', 'Wavecrest Payments', 'Tracewell',
]

export const jobTitles = [
  'Software Engineer', 'Senior Software Engineer', 'Staff Engineer', 'Engineering Manager',
  'Product Engineer', 'Site Reliability Engineer', 'Data Engineer', 'Security Engineer',
  'Frontend Engineer', 'ML Engineer', 'Platform Engineer', 'Director of Engineering',
]
