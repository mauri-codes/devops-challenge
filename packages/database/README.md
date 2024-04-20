## Overview
The database package serves as the data layer for the monorepo project. It utilizes Drizzle ORM to define the database schema, generate migrations, and manage interactions with the database. This package exposes the database connection and models/types to the rest of the application, ensuring a seamless integration between the data layer and the business logic in services like the api package.

### Features
- Schema Definition: Utilize Drizzle ORM to define the database schema in a programmatic and type-safe manner.
- Migration Management: Generate and apply database migrations to keep the schema up-to-date and version-controlled.
- Model Exposition: Expose database models and types for use in the application, facilitating data interactions.

### Environment Variables
- `DATABASE_URL` Database connection string for migrations

### Scripts
- Run migrations: `pnpm run migrate`
