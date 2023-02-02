import { Injectable } from '@nestjs/common';
import { UserModel } from './users.model';

@Injectable()
export class UsersService {
  constructor(private readonly userModel: UserModel) {}
  async getAllUsers() {
    return await this.userModel.getAll();
  }
}
