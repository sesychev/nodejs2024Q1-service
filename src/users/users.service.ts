import { Injectable } from '@nestjs/common';
import { UsersModel } from './users.model';
import { validate } from 'uuid';
import { BadRequestException } from 'src/common/common.errors';
import { CreateUserDto, UpdatePasswordDto } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersModel: UsersModel) {}

  async findAll() {
    return await this.usersModel.findAll();
  }

  async findOne(id: string) {
    if (validate(id)) return await this.usersModel.findOne(id);
    else throw new BadRequestException();
  }

  async post(dto: CreateUserDto) {
    if ((typeof dto.login || typeof dto.password !== 'string') !== 'string')
      throw new BadRequestException();
    return await this.usersModel.post(dto);
  }

  async put(id: string, dto: UpdatePasswordDto) {
    if (!validate(id)) throw new BadRequestException();
    if ((typeof dto.oldPassword || typeof dto.newPassword) !== 'string')
      throw new BadRequestException();
    return this.usersModel.put(id, dto);
  }

  async delete(id: string) {
    if (validate(id)) return await this.usersModel.delete(id);
    else throw new BadRequestException();
  }
}
