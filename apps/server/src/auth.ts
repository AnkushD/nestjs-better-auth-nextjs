import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { Resend } from 'resend';
import { schema } from './database/schema';

// Create database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false, // Disable SSL for local development
});

const db = drizzle(pool, { schema });

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
  }),

  //... other config options
  session: {
    expiresIn: 60 * 60 * 24, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },

  trustedOrigins: [
    'http://localhost:3000', // Frontend origin
    'http://localhost:8000', // Backend origin
  ],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // await sendEmail({
      //   to: user.email,
      //   subject: 'Verify your email address',
      //   text: `Click the link to verify your email: ${url}`,
      // });
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [user.email],
        subject: 'Verify your email address',
        html: `<strong>Click the link to verify your email: ${url}</strong>`,
      });
    },
  },
});

// import { betterAuth } from 'better-auth';
// import { drizzleAdapter } from 'better-auth/adapters/drizzle';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';
// import { schema } from './database/schema';

// // Create database connection
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: false, // Disable SSL for local development
// });

// const db = drizzle(pool, { schema });

// export const auth = betterAuth({
//   database: drizzleAdapter(db, {
//     provider: 'pg',
//   }),
//   baseURL: process.env.BASE_URL || 'http://localhost:8000',
//   secret: process.env.AUTH_SECRET || 'your-secret-key',
//   trustedOrigins: [
//     'http://localhost:3000', // Frontend origin
//     'http://localhost:8000', // Backend origin
//   ],
//   emailAndPassword: {
//     enabled: true,
//     requireEmailVerification: false,
//   },
//   socialProviders: {
//     ...(process.env.GOOGLE_CLIENT_ID &&
//       process.env.GOOGLE_CLIENT_SECRET && {
//         google: {
//           clientId: process.env.GOOGLE_CLIENT_ID,
//           clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         },
//       }),
//     ...(process.env.GITHUB_CLIENT_ID &&
//       process.env.GITHUB_CLIENT_SECRET && {
//         github: {
//           clientId: process.env.GITHUB_CLIENT_ID,
//           clientSecret: process.env.GITHUB_CLIENT_SECRET,
//         },
//       }),
//   },
// });
