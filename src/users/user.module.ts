import { Module } from '@nestjs/common';
import { UserModel } from './user.model';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserModel],
})
export class UsersModule {}
