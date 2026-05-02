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
- Instructors module
- Fitness classes module
- Booking workflow
- Availability

## Current Milestone
- Swagger

## Next Milestone
- Minimal tests

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
- Booking module includes transactional booking flow, duplicate/full/past-class protections, and authenticated self-service cancel/list endpoints.
- Availability endpoint `GET /api/classes/:id/availability` returns class capacity, confirmed bookings, and available spots while ignoring cancelled/soft-deleted bookings.
