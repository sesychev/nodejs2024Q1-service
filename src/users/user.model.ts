import { User } from './user.interface';

const users: Array<User> = [];

export class UserModel {
  async getAllUsers() {
    return users;
  }
}
