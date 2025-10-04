# Better Auth Integration with NestJS

This project demonstrates how to integrate Better Auth with NestJS following best practices.

## Features

- ✅ NestJS module system integration
- ✅ Dependency injection
- ✅ Type-safe configuration
- ✅ Auth guard for route protection
- ✅ Current user decorator
- ✅ Database schema with Drizzle ORM
- ✅ Email/password authentication
- ✅ Social providers support (Google, GitHub)

## Setup

### 1. Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_db"
AUTH_SECRET="your-super-secret-key-at-least-32-characters"
BASE_URL="http://localhost:3000"

# Optional: Social providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### 2. Database Migration

Run database migrations to create the required tables:

```bash
# Generate migration
pnpm drizzle-kit generate

# Push to database
pnpm drizzle-kit push
```

### 3. Start the Server

```bash
pnpm dev
```

## Usage

### Authentication Endpoints

Better Auth automatically provides these endpoints:

- `POST /api/auth/sign-up/email` - Sign up with email/password
- `POST /api/auth/sign-in/email` - Sign in with email/password
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/session` - Get current session
- `GET /api/auth/sign-in/google` - Google OAuth
- `GET /api/auth/sign-in/github` - GitHub OAuth

### Protecting Routes

Use the `AuthGuard` to protect routes:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, CurrentUser } from '../auth';

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(AuthGuard)
  getProtectedData(@CurrentUser() user: any) {
    return { message: 'This is protected data', user };
  }
}
```

### Getting Current User

Use the `@CurrentUser()` decorator to get the authenticated user:

```typescript
@Get('profile')
@UseGuards(AuthGuard)
getProfile(@CurrentUser() user: any) {
  return { user };
}
```

### Using Auth Service

Inject the `AuthService` to access Better Auth functionality:

```typescript
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth';

@Injectable()
export class SomeService {
  constructor(private readonly authService: AuthService) {}

  someMethod() {
    // Access Better Auth instance
    const auth = this.authService.getInstance();
    // Use auth.api methods...
  }
}
```

## Database Schema

The database schema includes the following tables required by Better Auth:

- `user` - User accounts
- `session` - User sessions
- `account` - OAuth accounts (Google, GitHub, etc.)
- `verification` - Email verification tokens

## Architecture

```
src/
├── auth/
│   ├── auth.module.ts        # Auth module configuration
│   ├── auth.service.ts       # Better Auth service wrapper
│   ├── auth.controller.ts    # Handles all /api/auth/* routes
│   ├── auth.guard.ts         # Route protection guard
│   ├── current-user.decorator.ts # User decorator
│   └── index.ts              # Exports
├── database/
│   ├── database.module.ts    # Database configuration
│   └── schema.ts             # Drizzle schema with auth tables
└── app.module.ts             # Main app module
```

## Benefits of This Approach

1. **NestJS Integration**: Follows NestJS patterns and conventions
2. **Dependency Injection**: Proper DI container usage
3. **Type Safety**: TypeScript support throughout
4. **Modularity**: Clean separation of concerns
5. **Extensibility**: Easy to extend with custom functionality
6. **Testing**: Mockable services for testing
7. **Configuration**: Environment-based configuration

## Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e
```

## Migration from Third-Party Packages

If you were using a third-party Better Auth package like `@thallesp/nestjs-better-auth`, this implementation provides:

- Better TypeScript support
- More control over configuration
- Easier debugging and customization
- Direct access to Better Auth APIs
- No external dependencies beyond Better Auth itself
