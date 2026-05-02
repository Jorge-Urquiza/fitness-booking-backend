# Project Progress

## Completed
- Initial README
- NestJS setup
- Application bootstrap configuration
- MySQL Docker Compose environment
- TypeORM database connection
- AI-assisted development workflow
- Core database entities
- Global exception handling
- Healthcheck endpoint

## Current Milestone
- Healthcheck endpoint

## Next Milestone
- Authentication module

## Notes
- Repository is currently being developed directly on `master`.
- Main tables use `deleted_at` for technical soft delete.
- Instructors are modeled as a separate entity and linked to fitness classes.
- TypeScript `strictPropertyInitialization` was set to `false` to avoid false positives on ORM-managed entity properties.
