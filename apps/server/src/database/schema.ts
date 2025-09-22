import { drizzle } from 'drizzle-orm/node-postgres';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

// Export the database type
export type Database = ReturnType<typeof drizzle<typeof schema>>;

// Export all schema
export const schema = {
  usersTable,
} as const;
