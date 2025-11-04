# Repository Guidelines

## Project Structure & Module Organization
- Monorepo managed by Turborepo; shared TypeScript configuration lives in `tsconfig.base.json`.
- `apps/web`: Next.js 16 frontend served on port 3001, with UI components under `src/components`, routes in `src/app`, assets in `public`, and global styles in `src/index.css`.
- `packages/backend/convex`: Convex functions, schema, and generated API types. Keep new tables and mutations here.
- `packages/linkedin-agent`: Express-based agent service; use it for LinkedIn-focused automations and MCP integrations.
- Shared tooling resides in the repository root (`turbo.json`, `bunfig.toml`, `tsconfig.*`); update these when introducing new workspaces or build steps.

## Build, Test, and Development Commands
- `bun install` installs workspace dependencies through the Bun package manager.
- `bun dev` runs `turbo dev`, starting the web app and backend concurrently.
- `bun dev:web` / `bun dev:server` narrow execution to a single target; pass `--filter` if you add more workspaces.
- `bun dev:setup` walks through Convex configuration; rerun after schema changes or environment resets.
- `bun build` triggers `turbo build` across all packages; required before deployment checks.
- `bun check-types` runs strict TypeScript checks; treat failures as blockers.
- For the LinkedIn agent, run `cd packages/linkedin-agent && bun run dev` to launch the local server.

## Coding Style & Naming Conventions
- TypeScript is strict (`noUncheckedIndexedAccess`, `noUnused*`); resolve warnings before committing.
- Match the existing tab-indented JSX formatting; avoid mixing tabs and spaces.
- React components use `PascalCase`; hooks and utilities use `camelCase`; route folders in `src/app` stay lowercase.
- Tailwind utility strings live inline; share reusable UI primitives in `apps/web/src/components`, and backend helpers within `packages/backend/convex`.

## Testing Guidelines
- No automated runner is wired up yet; rely on `bun check-types` plus manual smoke tests in `bun dev`.
- Add tests alongside features using `*.test.ts` files and register the command in `package.json` and `turbo.json` when introducing a framework.
- Document manual QA steps in pull requests until a dedicated test suite is established.

## Commit & Pull Request Guidelines
- Follow the concise, imperative commit style seen in history (e.g., `Fix TypeScript compilation errors for Vercel deployment`).
- Squash noisy commits before review; keep subjects under 72 characters and wrap body text at ~100.
- Pull requests must include a change summary, testing notes (commands run or UI screenshots), and links to issues or Convex deployments.
- Request review from maintainers responsible for the affected packages (`web`, `backend`, `linkedin-agent`).

## Environment & Configuration
- Copy provided `.env` templates when available and never commit secrets; Convex keys belong in local environment files.
- Keep schema updates in `packages/backend/convex/schema.ts` and rerun `bun dev:setup` after breaking changes.
- Update `turbo.json` if you add new tasks so pipelines stay deterministic, and note configuration changes in PR descriptions.
