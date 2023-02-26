import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from 'src/common/common.errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(dto: CreateUserDto) {
    if (!dto.login || !dto.password) {
      throw new BadRequestException();
    } else {
      const hash = await bcrypt.hash(dto.password, process.env.CRYPT_SALT);
      const user = await this.prisma.user.create({
        data: {
          login: dto.login,
          password: hash,
          version: 1,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      });
      return await this.token(user.id, user.login);
    }
  }

  async login(dto: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        login: dto.login,
      },
    });

    if (await bcrypt.compare(dto.password, user.password))
      throw new ForbiddenException();
    return await this.token(user.id, user.login);
  }

  async token(id: string, login: string) {
    const payload = {
      sub: id,
      login,
    };

    const access = await this.jwt.signAsync(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_KEY,
    });

    const refresh = await this.jwt.signAsync(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      secret: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      access: access,
      refresh: refresh,
    };
  }

  refresh(refreshTokenDto: RefreshTokenDto) {
    if (!refreshTokenDto.refreshToken) {
      throw new NotFoundException();
    }
  }
}
