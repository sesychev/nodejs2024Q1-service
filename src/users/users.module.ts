import { Module } from '@nestjs/common';
import { UsersModel } from './users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersModel],
})
export class UsersModule {}
