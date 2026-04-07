# GitHub Copilot instructions for `form-bio`

## What this repository is
- Next.js 16 app using App Router (`src/app/`), React 19, TypeScript, MUI, next-auth, and @vercel/postgres.
- Server actions under `src/server/actions/`, controller/queries pattern in `src/server/`, and UI in `src/app/` + `src/components/`.
- Legacy pages API exists under `src/pages/api` for auth (NextAuth dynamic route).

## Build/test commands
- `pnpm dev` (local watch dev server)
- `pnpm build` (production build)
- `pnpm start` (production node server)
- `pnpm lint` (ESLint)

## Agent task guidance
1. Prefer App Router and server components in `src/app/`.
2. For data operations, use existing `src/server/actions/*` and `src/server/queries/*`; avoid creating duplicate controller modules.
3. When adding page-level route logic, respect low nesting in `app/` file-based routing.
4. Follow existing style: minimal custom CSS in `globals.css`, component-level styling via React/Emotion/MUI.
5. Auth flows use `next-auth`; `src/pages/api/auth/[...nextauth].js` is auth entrypoint.

## Code conventions
- No `any` if possible (`tsconfig` already strict enough for this starter project).
- Use `async/await` with `try/catch` for server/database actions.
- Keep components small and reusable; search for `Button`, `Select`, `Searchbar` in `src/components` for patterns.

## Expected behavior for PRs
- Run `pnpm lint`; no ESLint violations.
- Test manual flow for changed feature (login, users CRUD, form submission).
- Update README only for workflow/documentation impact.

## Helpful locations
- `src/app/(dashboard)/Form.tsx` as active component context
- `src/server/actions/{createUser,deleteUser,updateUser}/` for mutation patterns
- `src/server/queries/users.ts` and `userSearch.ts` for query structures

## Link-not-embed principle
- Prefer linking to external docs (Next.js, next-auth, MUI) for deep behavior; keep instructions concise.
