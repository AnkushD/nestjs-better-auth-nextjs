import { Inject, Injectable } from '@nestjs/common';
// schemas
import { usersTable } from '../database/schema';
import type { Database } from '../database/schema';

@Injectable()
export class UsersService {
  constructor(@Inject('DRIZZLE') private readonly db: Database) {}

  async getUsers(): Promise<(typeof usersTable.$inferSelect)[]> {
    const users = await this.db.select().from(usersTable);
    return users;
  }

  async createUser(
    name: string,
    email: string,
  ): Promise<{ success: boolean; message: string }> {
    const result = await this.db
      .insert(usersTable)
      .values({ name, email })
      .onConflictDoNothing({ target: usersTable.email }); // check conflict on `email`

    if (result.rowCount === 0) {
      return { success: false, message: 'User already exists' };
    }

    return { success: true, message: 'User created successfully' };
  }
}
