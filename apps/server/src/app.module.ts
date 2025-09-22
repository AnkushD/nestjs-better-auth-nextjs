import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// controllers
import { AppController } from './app.controller';
// services
import { AppService } from './app.service';
// modules
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, DatabaseModule],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
