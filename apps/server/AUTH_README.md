# Better Auth with NestJS Integration

This project demonstrates how to integrate Better Auth with NestJS using the `@thallesp/nestjs-better-auth` package.

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Copy `.env.example` to `.env` and configure your database and auth settings:

   ```bash
   cp .env.example .env
   ```

3. **Database Setup:**
   Make sure your PostgreSQL database is running and run the migrations:
   ```bash
   npm run db:migrate
   ```

## Auth Configuration

The auth configuration is defined in `src/auth.ts`:

```typescript
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg' }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      /* config */
    },
    github: {
      /* config */
    },
  },
});
```

## Usage in Controllers

### Protecting Routes

Use the `AuthGuard` to protect routes and `@Session()` decorator to get the current user:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, Session } from '@thallesp/nestjs-better-auth';

@Controller('users')
export class UsersController {
  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Session() session: any) {
    console.log('Current user:', session?.user);
    // Your protected route logic
  }
}
```

### Available Decorators

- `@Session()` - Get the current session and user
- `@Public()` - Mark routes as public (bypass auth)
- `@Optional()` - Make auth optional for a route

### Available Guards

- `AuthGuard` - Requires authentication
- You can also create custom guards using the injected `AuthService`

## Auth Endpoints

The auth endpoints are automatically handled by Better Auth at `/api/auth/*`:

- `POST /api/auth/sign-up` - Register with email/password
- `POST /api/auth/sign-in` - Sign in with email/password
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/session` - Get current session
- `GET /api/auth/providers/google` - Google OAuth
- `GET /api/auth/providers/github` - GitHub OAuth

## Database Schema

The database schema includes the required Better Auth tables:

- `user` - User accounts
- `session` - User sessions
- `account` - OAuth provider accounts
- `verification` - Email verification tokens

## Development

Start the development server:

```bash
npm run dev
```

The server will be available at `http://localhost:3000` with auth endpoints at `http://localhost:3000/api/auth/*`.
