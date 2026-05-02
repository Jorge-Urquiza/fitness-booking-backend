# Implementation Plan

## Completed
- Core entities
- Global exception handling
- Healthcheck
- Auth

## Next
- Instructors

## Pending
- Fitness classes
- Bookings
- Availability
- Swagger
- Minimal tests
- Final README guide

## Milestones

### Instructors
- Create instructor
- List instructors
- Get instructor by id
- Validate required fields
- Follow soft delete convention

### Fitness classes
- Create fitness class
- List fitness classes
- Get fitness class by id
- Validate instructor exists
- Optional filters (date, instructorId)

### Bookings
- Booking creation and cancelation
- Prevent duplicate active booking
- Prevent overbooking
- Prevent booking past classes
- Prevent cancelation after class starts

### Availability
- Calculate availability per class
- Return capacity, confirmed bookings, available spots

### Swagger
- Add OpenAPI documentation
- Document auth, instructors, classes, bookings and health endpoints

### Minimal tests
- Add critical unit tests for booking business rules
- Prioritize service-level tests

### Final README guide
- Update README with setup
- Environment variables
- API usage
- Demo flow
- Technical decisions

## Execution Notes
- Move milestone-by-milestone; avoid parallel unfinished features.
- `PROGRESS.md` is the source of truth for current execution state.