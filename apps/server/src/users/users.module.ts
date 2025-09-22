import { Module } from '@nestjs/common';
// controllers
import { UsersController } from './users.controller';
// services
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
