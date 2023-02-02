import { Controller, Get } from '@nestjs/common';
import { User } from './user.interface';
import { UsersService } from './user.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<Array<User>> {
    return this.usersService.getAllUsers();
  }
}
