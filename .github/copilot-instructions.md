# GitHub Copilot Instructions — ktozkim.pl (Mistral)

Purpose: Give AI coding agents the minimal, actionable knowledge to be productive quickly in this repo: architecture, dev/test/deploy workflows, conventions, integration points, and concrete examples.

## Quick architecture summary 🔧

- Monorepo with 3 services: **frontend** (React + Vite + TypeScript), **backend** (Express + TypeScript), **database** (Postgres).
- Primary data flow: Frontend ⇄ Backend API (/api/\*) ⇄ Postgres (SQL in `database/init.sql`).
- Main backend routes: `/api/auth`, `/api/officials`, `/api/reports`. Health endpoint: `/health` (see `backend/src/index.ts`).
- Auth: JWT tokens are used for API auth. Google OAuth is optional via Passport (`backend/src/routes/auth.ts`).

## How to run locally (concrete commands) ⚡

- Start DB only: `docker-compose up -d db` (service name: `db`).
- Full local stack (Docker): `docker-compose up -d` (frontend:3000, backend:5000 per `docker-compose.yml`).
- Backend (dev):
  - `cd backend && npm ci && npm run dev` (nodemon + ts-node; port defaults to 5000 in code)
- Frontend (dev):
  - `cd frontend && npm ci && npm run dev` (Vite; uses VITE_API_BASE_URL or runtime host fallback)

Notes: The README mentions `5001` in one place; the running default in code/docker-compose is `5000` (see `backend/src/index.ts` and `docker-compose.yml`).

## Tests / CI & exact test setup ✅

- CI (see `.github/workflows/deploy.yml`) spins up a Postgres service, runs `database/init.sql`, then runs:
  - Backend tests: `cd backend && npm test -- --forceExit --detectOpenHandles` (envs set in workflow)
  - Frontend tests: `cd frontend && npm test -- --watchAll=false`
- Locally, tests require a database; replicate GitHub Actions steps: run DB via Docker and load `database/init.sql` (or set `DATABASE_URL` to a test DB). Backend tests read `.env.test` if present (`backend/tests/setup.ts`).

Example local test flow:

- `docker-compose up -d db`
- `PGPASSWORD=ktozkim_password psql -h localhost -U ktozkim_user -d ktozkim_test -f database/init.sql`
- `cd backend && NODE_ENV=test DB_HOST=localhost DB_PORT=5432 DB_NAME=ktozkim_test DB_USER=ktozkim_user DB_PASSWORD=ktozkim_password JWT_SECRET=test_jwt_secret npm test -- --forceExit`

## PR checklist ✅

- Use `.github/PULL_REQUEST_TEMPLATE.md` when opening PRs and fill out the checklist.
- Ensure tests pass locally and CI is green (see Tests / CI section above).
- Document DB schema changes in `database/init.sql` or add SQL migration and describe it in the PR.
- Update docs (`README.md`, `CONTRIBUTING.md`, `.github/copilot-instructions.md`) for runtime, API, or CI changes.
- Run linting for both backend and frontend before submitting.

## Environment variables (most relevant) 🔐

- Backend recognizes either `DATABASE_URL` or `DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD` (see `backend/src/config/database.ts`).
- Common variables used: `JWT_SECRET`, `SESSION_SECRET`, `FRONTEND_URL`, `PORT`, `GOOGLE_CLIENT_ID/SECRET/REDIRECT_URI` (see `backend/src/routes/auth.ts`).
- Frontend: `VITE_API_BASE_URL` (overrides runtime host-based fallback; see `frontend/src/services/api.ts`).
- Note: `.env` and `.env.test` are expected but not included — add them when working locally.

## Repo conventions & patterns to follow 🧭

- TypeScript-first across both services. Use existing interface patterns (see `backend/src/models/*.ts`).
- Direct SQL via `pg` with parameterized queries (look at `UserModel` in `backend/src/models/User.ts`). Follow the same style for new models: returning row => convert to typed object.
- Validation: `express-validator` used in routes; middleware pattern is express route → route-level validation → model call → error response.
- Error handling: single `errorHandler` and `notFound` middlewares are attached near the end of `backend/src/index.ts`. Keep errors descriptive and preserve HTTP codes.
- Auth: `authenticateToken` middleware expects header `Authorization: Bearer <token>` and validates user existence (`backend/src/middleware/auth.ts`). For optional authentication use `optionalAuth`.

## Integration points / notable files 🔗

- DB schema & sample data: `database/init.sql` (used in CI/test flows)
- Health check: `backend/src/index.ts` → `GET /health`
- Auth flows: `backend/src/routes/auth.ts` (JWT generation, Google OAuth via Passport)
- Frontend API usage & token handling: `frontend/src/services/api.ts` (token stored in `localStorage` under `token`, `getCurrentUser` uses `Authorization` header)
- CI/CD: `.github/workflows/deploy.yml` (runs tests, builds/pushes Docker images, deploys to Railway)

## Small gotchas / things an agent should not assume ⚠️

- README states `backend` runs on `5001` in one place; actual default in code and docker-compose is `5000`.
- `package.json` includes a `migrate` script (`node dist/scripts/migrate.js`) but there is no source `scripts/migrate.ts` in the repo — migrations are currently raw SQL in `database/`.
- Tests expect `.env.test` or explicit test env vars (see `backend/tests/setup.ts`).

## Example PR tips for automated edits 🛠️

- If adding DB fields, update `database/init.sql` (add migrations) and adjust corresponding model interfaces and queries in `backend/src/models/*`.
- If adding new API routes, follow pattern in `backend/src/routes/*`: add route, validation with `express-validator`, call to model, and ensure test coverage in `backend/tests/`.
- When changing auth behavior, update `frontend/src/services/api.ts` if the token contract changes.

---

If anything above is unclear or you want more examples (e.g., a sample PR that updates a model + tests), say which area you'd like me to expand and I will iterate. ✅
