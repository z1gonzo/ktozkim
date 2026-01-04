## Summary
Describe the change and why it was made. Keep it short and focused.

## Checklist
- [ ] Linked to an issue (if applicable)
- [ ] Tests added/updated (backend/frontend) and passing locally
- [ ] Database changes documented in `database/init.sql` (or migration added)
- [ ] Relevant docs updated (`README.md`, `CONTRIBUTING.md`, `.github/copilot-instructions.md`)
- [ ] Linting passed (backend & frontend)
- [ ] CI is green (GitHub Actions)

## How to test locally
1. Start DB: `docker-compose up -d db`
2. Backend dev: `cd backend && npm ci && npm run dev`
3. Frontend dev: `cd frontend && npm ci && npm run dev`
4. Run backend tests (requires test DB):
   ```bash
   PGPASSWORD=ktozkim_password psql -h localhost -U ktozkim_user -d ktozkim_test -f database/init.sql
   cd backend
   NODE_ENV=test DB_HOST=localhost DB_PORT=5432 DB_NAME=ktozkim_test DB_USER=ktozkim_user DB_PASSWORD=ktozkim_password JWT_SECRET=test_jwt_secret npm test -- --forceExit --detectOpenHandles
   ```

## Reviewer notes
- Files changed:
- DB migrations/notes:
- Manual steps (if any):

_Please include a short description for reviewers about scope and risks._
