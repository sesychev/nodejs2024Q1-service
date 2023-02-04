import { v4 } from 'uuid';
import { User } from './user.interface';
import {
  ForbiddenException,
  NotFoundException,
} from 'src/common/common.errors';
import { CreateUserDto, UpdatePasswordDto } from './create-user.dto';

class ClassUser implements User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    this.id = v4();
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    this.version = 1;
  }

  show() {
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class UsersModel {
  private users: Array<ClassUser> = [];

  public async findAll() {
    return this.users;
  }

  public async findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException();
    return user.show();
  }

  public async post(dto: CreateUserDto) {
    const user = new ClassUser(dto.login, dto.password);
    this.users.push(user);
    return user.show();
  }

  public async put(id: string, dto: UpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException();
    if (user.password !== dto.oldPassword) throw new ForbiddenException();
    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return user.show();
  }

  public async delete(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException();
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  }

  public async password(id: string, dto: UpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);
    return user.password === dto.oldPassword;
  }
}
