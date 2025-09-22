import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// databse
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { schema } from './schema';

@Global() // makes it available everywhere without re-importing
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DRIZZLE',
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow('DATABASE_URL'),
          ssl: false, // Disable SSL for local development
        });
        return drizzle(pool, { schema });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DRIZZLE'],
})
export class DatabaseModule {}
