import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard, Session } from '@thallesp/nestjs-better-auth';
// Services
import { UsersService } from './users.service';
// types
//import { CreateUserRequestDto, CreateUserResponseDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Session() session: any): any {
    console.log('Current user:', session?.user);
    return { message: 'This is a protected route', user: session?.user };
  }

  // @Get()
  // @UseGuards(AuthGuard)
  // getUsers(@Session() session: any): any {
  //   console.log('Current user:', session?.user);
  //   return this.usersService.getUsers();
  // }

  // @Post()
  // createUser(
  //   @Body() createUserRequestDto: CreateUserRequestDto,
  // ): Promise<CreateUserResponseDto> {
  //   return this.usersService.createUser(
  //     createUserRequestDto.name,
  //     createUserRequestDto.email,
  //   );
  // }
}
