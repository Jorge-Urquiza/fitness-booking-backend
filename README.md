# Fitness Booking Backend

Backend API en NestJS para gestionar reservas de clases fitness.

## MVP

Este proyecto es un MVP centrado en el flujo principal de reservas.
El objetivo es demostrar reglas de negocio clave con un alcance pequeño y mantenible.
Por eso, no todos los modulos incluyen CRUD completo.

Incluye solo los endpoints necesarios para:
- autenticacion
- instructores
- clases fitness
- reservas
- disponibilidad
- healthcheck

## Tech Stack

- Node.js
- NestJS
- TypeScript
- MySQL
- TypeORM
- Docker Compose
- JWT
- bcrypt
- Swagger
- Jest

## Instalacion

```bash
npm install
docker compose up -d
npm run start:dev
```

## Ejecutar tests

El proyecto incluye tests minimos enfocados en validar reglas de negocio del flujo de reservas.

```bash
npm test
```

## Variables de entorno

Configura tu archivo `.env` tomando como base `.env.example`.

## Swagger

La documentacion de la API esta disponible en:

- http://localhost:3000/api/docs

## Endpoints por modulo

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Instructors

- `POST /api/instructors`
- `GET /api/instructors`
- `GET /api/instructors/:id`

### Fitness Classes

- `POST /api/classes`
- `GET /api/classes`
- `GET /api/classes/:id`

### Bookings

- `POST /api/classes/:classId/book`
- `POST /api/bookings/:id/cancel`
- `GET /api/bookings/me`

### Availability

- `GET /api/classes/:id/availability`

### Health

- `GET /api/health`

## Reglas de negocio de reservas

- Un usuario debe estar autenticado para reservar una clase.
- Un usuario no puede reservar una clase que no existe.
- Un usuario no puede reservar una clase pasada.
- Un usuario no puede tener mas de una reserva activa para la misma clase.
- Una reserva confirmada consume un cupo disponible.
- Una reserva cancelada no consume cupos disponibles.
- Un usuario no puede reservar si la capacidad de la clase esta completa.
- Un usuario solo puede cancelar sus propias reservas.
- Un usuario no puede cancelar una reserva ya cancelada.
- Un usuario no puede cancelar una reserva despues de que la clase haya iniciado.

## Reglas de negocio de disponibilidad

- La disponibilidad se calcula como capacidad de la clase menos reservas confirmadas.
- Las reservas canceladas se ignoran.
- Los registros con soft delete se ignoran.
- El endpoint retorna capacidad, reservas confirmadas y cupos disponibles.

## Notas

- Las tablas principales usan `deleted_at` para un borrado logico.
- Se usan DTOs y mappers para evitar retornar entidades directamente.
- Este MVP prioriza reglas de negocio y mantenibilidad sobre construir un CRUD grande.
- Se implementaron tests necesarios para validar reglas de negocio clave del dominio (especialmente en reservas y disponibilidad).
