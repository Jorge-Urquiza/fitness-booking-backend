# Fitness Booking Backend - Agent Guide

## Project Overview
NestJS API to manage fitness class reservations (users, classes, bookings, availability), backed by MySQL and TypeORM.

## Stack
- Node.js + TypeScript
- NestJS
- TypeORM
- MySQL (Docker Compose)
- Jest (for minimal testing phase)

## Current Repo Conventions
- Work from repository root.
- Keep modules feature-oriented (`src/<feature>`).
- Keep DTOs, entities, services, controllers separated per module.
- Use clear naming: `*.controller.ts`, `*.service.ts`, `*.entity.ts`, `*.dto.ts`.
- Keep README and progress docs updated as milestones move.

## Architecture Rules
- Use layered NestJS structure: Controller -> Service -> Repository/TypeORM.
- Keep business logic in services, not controllers.
- Use DTO validation for request boundaries.
- Prefer explicit database relations and constraints in entities.
- Add global cross-cutting concerns (errors, validation, auth guards) centrally.

## Validation Commands
- Install deps: `npm install`
- Run app (dev): `npm run start:dev`
- Build: `npm run build`
- Unit tests: `npm test`

## Git / Commit Rules
- Keep commits focused and small.
- Use clear commit messages (`type: short description`).
- Do not mix docs-only and feature code in the same commit unless tightly related.
- Before commit, run relevant checks for touched files.
- Prefer PR workflow even if currently working on `master`.

## Mandatory Progress Update
At the end of every task, update `PROGRESS.md` to reflect:
- What was completed
- Current milestone
- Next milestone
- Any blockers/notes (if present)

## Do-Not-Do Rules
- Do not change business requirements without explicit instruction.
- Do not introduce new infrastructure/services unless requested.
- Do not add skills or `.codex/skills` unless requested.
- Do not change `package.json`, `docker-compose.yml`, or TypeORM config unless requested.
- Do not add unrelated refactors while implementing a milestone.
