import { Controller, Get } from '@nestjs/common';
import { User } from './user.interface';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll(): Promise<Array<User>> {
    return this.usersService.getAllUsers();
  }
}
//https://github.com/royib/clean-architecture-nestJS/blob/main/src/controllers/book.controller.ts
//https://betterprogramming.pub/clean-node-js-architecture-with-nestjs-and-typescript-34b9398d790f
