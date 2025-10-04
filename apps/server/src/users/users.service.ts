import { Inject, Injectable, ConflictException } from '@nestjs/common';
// schemas
//import { usersTable } from '../database/schema';
// types
import type { Database } from '../database/schema';
//import type { CreateUserResponseDto } from './dto';

@Injectable()
export class UsersService {
  constructor(@Inject('DRIZZLE') private readonly db: Database) {}

  // async getUsers(): Promise<(typeof usersTable.$inferSelect)[]> {
  //   const users = await this.db.select().from(usersTable);
  //   return users;
  // }

  // async createUser(name: string, email: string) {
  //   const result = await this.db
  //     .insert(usersTable)
  //     .values({ name, email })
  //     .onConflictDoNothing({ target: usersTable.email })
  //     .returning();

  //   // if there is a conflict (email already exists)
  //   if (result.length === 0) {
  //     // Use NestJS HttpException
  //     throw new ConflictException(
  //       'Email already exists. Please use a different email address.',
  //     );
  //   }

  //   return result[0]; // let controller wrap it in a DTO
  // }
}
