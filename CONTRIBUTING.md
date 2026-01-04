Thank you for contributing! This file contains quick, actionable guidance for both humans and automated agents working in this repository.

- Branches: create a short-lived feature branch off `master`/`main`, named `feat/...`, `fix/...`, or `chore/...`.
- Commit messages: brief, present-tense, include scope (e.g., `backend: add reports endpoint`).

Local development
- Start DB: `docker-compose up -d db` (service name: `db`).
- Backend dev: `cd backend && npm ci && npm run dev` (Server on port 5000)
- Frontend dev: `cd frontend && npm ci && npm run dev` (Vite dev server on port 3000)

Tests & CI
- CI runs GitHub Actions that:
  - Spins up Postgres and runs `database/init.sql`
  - Runs backend tests: `cd backend && npm test -- --forceExit --detectOpenHandles`
  - Runs frontend tests: `cd frontend && npm test -- --watchAll=false`
- Locally replicate CI for backend tests by preparing a test DB and running the same test command (see `.github/PULL_REQUEST_TEMPLATE.md` for an example).

Project-specific conventions
- TypeScript-first; add interfaces to `backend/src/models/*` when adding new DB-backed types.
- DB access uses raw `pg` queries. Parameterize all SQL queries and return typed objects (see `backend/src/models/User.ts`).
- Validation: use `express-validator` in route handlers (see `backend/src/routes/*`).
- Error handling: use `notFound` and `errorHandler` middlewares; keep HTTP codes descriptive.
- Auth: JWTs issued by `backend/src/routes/auth.ts`. Protected endpoints use `Authorization: Bearer <token>` validated by `backend/src/middleware/auth.ts`.

Documentation updates
- If your change affects runtime config, CI, DB schema, or public API, update `README.md` and `.github/copilot-instructions.md` accordingly.

If you're unsure about how to test or where to add coverage, open a draft PR and tag maintainers for quick feedback.
