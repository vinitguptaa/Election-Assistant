# CivicPulse Election Assistant

Production-ready AI-powered election assistant built with Next.js 15, TypeScript, Tailwind CSS, shadcn-style UI primitives, Prisma, PostgreSQL, NextAuth, OpenAI, Recharts, and Framer Motion.

Live demo: https://election-assistant-twnh.onrender.com

This project was built with the help of prompt engineering workflows, using structured prompts to plan features, shape AI assistant behavior, improve UX flows, and keep responses neutral, clear, and useful for civic information.

## Features

- Login-first experience with sign in/sign up support before accessing core app functionality.
- AI election chatbot with intent detection, multilingual-ready prompts, voice input, text-to-speech, supporting cards, and chat history persistence.
- Site search across candidates, parties, booths, election timelines, news, FAQs, and app features.
- Interactive election timeline with regional filtering and countdowns.
- Voter eligibility checker with dynamic missing requirements and next steps.
- Polling booth finder with OpenStreetMap route links and mock queue estimates.
- Election process visualizer for registration, nominations, campaigning, EVM/VVPAT, counting, and results.
- News, notifications, verified source badges, sentiment labels, and AI misinformation checks.
- Candidate and party comparison with manifesto, asset, priority, and previous performance data.
- Admin dashboard with analytics, moderation hooks, RBAC-ready auth, audit logs, and API protection.
- REST API routes, Zod validation, rate limiting, structured logging, Swagger JSON, Docker, CI, and Vercel config.

## Tech Stack

- Frontend: Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui-style reusable components
- Backend: Next.js Route Handlers on Node.js
- Database: PostgreSQL with Prisma ORM
- Auth: NextAuth credentials provider with Prisma adapter
- AI: OpenAI API, with safe mock fallback when no key is provided
- Deployment: Docker-ready Render service, with optional PostgreSQL persistence

## Quick Start

```bash
cd election-assistant
cp .env.example .env
npm install
npx prisma generate
npm run db:migrate
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

By default, `NEXT_PUBLIC_ENABLE_MOCKS=true` lets the app run without a database for UI development. The login page includes demo-friendly credentials in mock mode. Set mocks to `false` in production to persist users, chat history, and API data in PostgreSQL.

## Prompt Engineering Focus

- Structured prompts guide the assistant toward neutral, source-aware election explanations.
- The chatbot flow separates intent detection, safety checks, and user-facing responses.
- Prompting was used during development to refine app flows such as login-first access, search behavior, eligibility guidance, and civic information presentation.
- The project emphasizes responsible AI behavior for a sensitive domain: clarity, neutrality, and verification reminders.

## Environment

Required production variables:

```bash
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
OPENAI_API_KEY=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_ENABLE_MOCKS=false
```

Optional integrations:

```bash
GOOGLE_MAPS_API_KEY=
RESEND_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=
```

## API

Swagger JSON is available at:

```text
/api/swagger.json
```

Core endpoints:

- `POST /api/assistant/chat`
- `POST /api/assistant/moderate`
- `POST /api/eligibility`
- `GET /api/timeline?region=Delhi`
- `GET /api/polling-booths?pinCode=110001`
- `GET /api/candidates?region=Delhi`
- `GET /api/news`
- `GET /api/admin/analytics`
- `POST /api/notifications`
- `GET /api/updates/stream`

## Deployment

### Render

1. Connect the GitHub repository to Render.
2. Choose Docker deployment.
3. Add environment variables in the Render dashboard.
4. Deploy the latest commit.
5. For persistent production data, add a PostgreSQL database and run:

```bash
npm run db:deploy
npm run db:seed
```

### Other Platforms

The app can also run on platforms that support Next.js and Node.js. Use `npm run build` and `npm start`, or deploy with the included Dockerfile.

## Docker

```bash
cp .env.example .env
docker compose up --build
```

## Testing

```bash
npm run typecheck
npm test
npm run build
```

## Folder Structure

```text
app/                  Next.js routes and API route handlers
components/           Reusable UI and feature components
lib/                  AI, data access, auth, validation, rate limit, utilities
prisma/               Schema and seed scripts
tests/                Unit tests
.github/workflows/    CI pipeline
```

## Production Notes

- Replace mock data with official election commission feeds before public launch.
- Use a managed rate limiter such as Upstash Redis for multi-instance deployments.
- Add a CAPTCHA provider to sensitive forms before public traffic.
- Keep assistant answers neutral, source-backed, and auditable.
- Review election law and accessibility requirements for each jurisdiction.
