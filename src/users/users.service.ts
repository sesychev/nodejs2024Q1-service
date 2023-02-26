/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import {
  ForbiddenException,
  NotFoundException,
} from 'src/common/common.errors';
import { CreateUserDto, UpdatePasswordDto } from './create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersModel: PrismaService) {}

  async findAll() {
    return await this.usersModel.user.findMany();
  }

  async findID(id: string) {
    return await this.usersModel.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOne(id: string) {
    const item = await this.findID(id);

    if (!item) throw new NotFoundException();

    return item;
  }

  async post(dto: CreateUserDto) {
    const item = {
      login: dto.login,
      password: dto.password,
      id: v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const newItem = await this.usersModel.user.create({ data: item });

    const { password, ...post } = newItem;

    return post;
  }

  async put(id: string, dto: UpdatePasswordDto) {
    const item = await this.findID(id);

    if (!item) throw new NotFoundException();

    if (item.password !== dto.oldPassword) throw new ForbiddenException();

    const newUser = await this.usersModel.user.update({
      where: {
        id: id,
      },
      data: {
        password: dto.newPassword,
        version: item.version + 1,
        updatedAt: Date.now(),
      },
    });
    const { password, ...put } = newUser;

    return put;
  }

  async delete(id: string) {
    const item = await this.findID(id);

    if (!item) throw new NotFoundException();

    return await this.usersModel.user.delete({
      where: { id: id },
    });
  }
}
