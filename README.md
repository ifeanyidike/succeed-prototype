# Succeed Competition Platform Prototype

This prototype demonstrates a multi-tenant competition platform for schools, allowing school administrators to create and manage competitions with different visibility levels.

## Features

- Multi-tenant system with isolated data access for different schools
- Competition visibility settings:
  - Public: Visible to all schools
  - Private: Only visible to the creating school
  - Restricted: Visible to selected schools
- User role-based permissions
  - School admins: Can create and manage competitions for their school
  - Students: Can view competitions accessible to their school
- Tenant isolation via ownerTenantId field

## Technical Implementation

### Data Model

The prototype uses localstorage data store with the following structure:

- **Schools (Tenants)**
  - id, name, domain
- **Users**
  - id, email, name, role, schoolId
- **Competitions**
  - id, title, description, startDate, endDate, ownerTenantId, visibility, allowedSchools

### Tenant Isolation

- Row-level tenant isolation is implemented via the `ownerTenantId` field
- The visibility model allows for sharing across tenants when appropriate
- All data access is filtered based on user's tenant (school) and competition visibility

### Authentication

For simplicity, the prototype uses a mock authentication system with hardcoded users:

- admin@nationalhigh.edu (National High School Admin)
- admin@cederwood.edu (Cederwood International School Admin)

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   yarn install
   ```
3. Run the development server:
   ```
   yarn dev
   ```
4. Open http://localhost:3000 in your browser

## Design Decisions

- Used Next.js App Router for efficient server/client component splitting
- Implemented client-side authentication with localStorage for demo purposes
- Created a visibility filtering system in the API layer for proper tenant isolation
- Used TypeScript for type safety and better developer experience

## Scaled Production Considerations

In a production environment, this prototype would be extended with:

- Real authentication system (NextAuth.js, Supabase Auth, Auth0)
- PostgreSQL database with row-level security
- Redis caching for frequently accessed data
- Proper API validation with zod or similar
- Error handling middleware and logging
- Unit and integration tests
- UI component library for styling

## Next Steps

- Implement a proper database connection
- Add real authentication
- Add more features like competition submissions
- Improve the UI with proper styling
- Add more comprehensive error handling
