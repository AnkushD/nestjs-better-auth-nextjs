import { Body, Controller, Get, Post } from '@nestjs/common';
// services
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): any {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(@Body('name') name: string, @Body('email') email: string): any {
    return this.usersService.createUser(name, email);
  }
}
