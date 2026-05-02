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
- Authentication module

## Current Milestone
- Authentication module

## Next Milestone
- Fitness classes module

## Notes
- Repository is currently being developed directly on `master`.
- Main tables use `deleted_at` for technical soft delete.
- Instructors are modeled as a separate entity and linked to fitness classes.
- TypeScript `strictPropertyInitialization` was set to `false` to avoid false positives on ORM-managed entity properties.
- Authentication uses explicit DTOs for both input (request) and output (response).
- Authentication uses dedicated mappers for DTO -> persistence and entity -> response DTO transformations.
- Input normalization (`trim`/`lowercase`) is handled in DTOs with `class-transformer` (`@Transform`).
- Shared `MapperInterface` is located in `common/interfaces` for reuse across modules.
- Auth constants centralize reusable messages and security defaults.
