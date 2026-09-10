# REXA Server

The authentication and token management platform for [REXA](https://github.com/subhamoydatta703/REXA-SERVER) — a general-purpose, single-agent development harness. This repository contains the web application that handles user authentication, CLI token generation, and token verification for the REXA CLI.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [License](#license)

---

## Overview

REXA Server is the authentication backbone for the REXA CLI. It provides:

- A **landing page** that introduces the REXA agent and its capabilities
- A **secure dashboard** where authenticated users generate time-limited CLI tokens
- A **backend API** that issues, hashes, stores, and verifies tokens used by the REXA CLI
- **Automatic user provisioning** — new Clerk-authenticated users are synced to the local database on first request

The REXA CLI authenticates against this server by exchanging a one-time token generated from the dashboard. Tokens are SHA-256 hashed before storage and expire after 7 days.

---

## Architecture

REXA follows a monorepo structure with two independent applications:

```
rexa-server/
├── backend/     Express API server (Bun runtime)
└── frontend/    Next.js web application
```

The frontend serves a public landing page and an authenticated dashboard for CLI token generation. The backend handles user management, token lifecycle (generation, hashing, expiry, verification), and provides the API that the REXA CLI authenticates against. Both applications share a Clerk-based identity layer.

---

## Tech Stack

### Backend

| Component       | Technology                            |
|-----------------|---------------------------------------|
| Runtime         | Bun                                   |
| Framework       | Express 5                             |
| Language        | TypeScript (strict mode)              |
| Database        | PostgreSQL (with pgvector)            |
| ORM             | Prisma 7 (with `@prisma/adapter-pg`)  |
| Authentication  | Clerk (`@clerk/express`)              |
| Validation      | Zod 4                                 |

### Frontend

| Component       | Technology                            |
|-----------------|---------------------------------------|
| Framework       | Next.js 16 (App Router)               |
| Language        | TypeScript                            |
| Styling         | Tailwind CSS 4                        |
| Authentication  | Clerk (`@clerk/nextjs`)               |
| Icons           | Lucide React                          |
| Typography      | Geist / Geist Mono (Google Fonts)     |

---

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma            # Database schema (User, authToken, QueryChunk)
│   ├── migrations/              # Prisma migration history
│   └── generated/               # Generated Prisma client
├── src/
│   ├── server.ts                # Server entrypoint
│   ├── app.ts                   # Express app configuration (CORS, middleware, routes)
│   ├── config/
│   │   └── db.ts                # Prisma client initialization with pg adapter
│   ├── controllers/
│   │   ├── tokenController.ts   # Token generation and verification handlers
│   │   └── userController.ts    # User retrieval and creation handlers
│   ├── middlewares/
│   │   └── authMiddleware.ts    # Clerk JWT verification + user sync
│   ├── routes/
│   │   ├── authRoutes.ts        # POST /api/auth/token
│   │   ├── cliRoutes.ts         # POST /api/cli/verify
│   │   └── userRoutes.ts        # GET  /api/users/me
│   ├── services/
│   │   ├── tokenService.ts      # Token generation (SHA-256) and verification
│   │   └── userService.ts       # User database operations
│   └── utils/
│       └── userValidation.ts    # Zod schemas for user input
├── package.json
└── tsconfig.json

frontend/
├── public/                      # Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with Clerk provider
│   │   ├── page.tsx             # Landing page
│   │   ├── globals.css          # Global styles
│   │   ├── dashboard/
│   │   │   └── page.tsx         # Authenticated dashboard
│   │   ├── sign-in/             # Clerk sign-in page
│   │   └── sign-up/             # Clerk sign-up page
│   ├── components/
│   │   ├── common/              # Shared components (logo, etc.)
│   │   ├── dashboard/
│   │   │   ├── TokenGenerator.tsx   # Token generation UI
│   │   │   └── CountdownTimer.tsx   # Token expiry countdown
│   │   └── landing/
│   │       ├── Navbar.tsx
│   │       ├── Hero.tsx
│   │       ├── PhilosophySection.tsx
│   │       ├── LifecycleWorkflow.tsx
│   │       ├── FeaturesGrid.tsx
│   │       ├── CliSection.tsx
│   │       ├── BuiltBySection.tsx
│   │       ├── TerminalPreview.tsx
│   │       ├── HarnessNotice.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   └── api.ts               # Backend API client
│   └── proxy.ts                 # Dev proxy configuration
├── package.json
└── next.config.ts
```

---

## Prerequisites

- [Bun](https://bun.sh) (v1.3+ recommended)
- [Node.js](https://nodejs.org) (v20+ for Next.js)
- PostgreSQL instance with `pgvector` extension enabled
- [Clerk](https://clerk.com) account (for authentication keys)

---

## Environment Setup

### Backend (`backend/.env`)

```env
DATABASE_URL=<your-postgresql-connection-string>
CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
FRONTEND_URL=<your-frontend-url>
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
```

> **Important:** Never commit `.env` or `.env.local` files to version control. Both are excluded via `.gitignore`.

---

## Installation

```bash
# Clone the repository
git clone https://github.com/subhamoydatta703/REXA-SERVER.git
cd REXA-SERVER

# Install backend dependencies
cd backend
bun install

# Generate Prisma client and run migrations
bunx prisma generate --schema=prisma/schema.prisma
bunx prisma migrate deploy

# Install frontend dependencies
cd ../frontend
bun install
```

---

## Running Locally

### Backend (port 5000)

```bash
cd backend
bun run dev
```

This starts the Express server with hot-reload via `bun --watch`.

### Frontend (port 3000)

```bash
cd frontend
bun run dev
```

This starts the Next.js development server.

### Health Check

```
GET http://localhost:5000/health
```

Returns `{ "status": "ok" }` when the backend is running.

---

## API Endpoints

### Authentication

| Method | Endpoint             | Auth Required | Description                                    |
|--------|----------------------|---------------|------------------------------------------------|
| POST   | `/api/auth/token`    | Clerk JWT     | Generate a new CLI authentication token        |

### CLI

| Method | Endpoint             | Auth Required | Description                                    |
|--------|----------------------|---------------|------------------------------------------------|
| POST   | `/api/cli/verify`    | Bearer Token  | Verify a CLI token (sent as `Authorization: Bearer <token>`) |

### Users

| Method | Endpoint             | Auth Required | Description                                    |
|--------|----------------------|---------------|------------------------------------------------|
| GET    | `/api/users/me`      | Clerk JWT     | Retrieve the authenticated user's profile      |


---


## Security

- **Tokens are never stored in plaintext.** The backend stores only SHA-256 hashes; the raw token is returned once and held in ephemeral React component state.
- **No browser persistence.** Tokens are never written to `localStorage`, `sessionStorage`, cookies, or URL parameters.
- **Automatic expiry.** Tokens expire 7 days after generation. Previous tokens are revoked when a new one is generated.
- **Environment isolation.** `CLERK_SECRET_KEY` is server-side only. Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser bundle.
- **CORS restrictions.** The backend restricts cross-origin requests to explicitly allowed origins.
- **Input validation.** User input is validated through Zod schemas before database operations.

---

## License

This project is proprietary. All rights reserved.
