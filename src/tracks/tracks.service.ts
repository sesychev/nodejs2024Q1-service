import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/common/common.errors';
import { CreateTrackDto, UpdateTrackDto } from './dto/create-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private readonly tracksModel: PrismaService) {}

  async findAll() {
    return await this.tracksModel.track.findMany();
  }

  async findID(id: string) {
    return await this.tracksModel.track.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOne(id: string) {
    const item = await this.findID(id);

    if (!item) throw new NotFoundException();
  }

  async post(dto: CreateTrackDto) {
    return await this.tracksModel.track.create({
      data: dto,
    });
  }

  async put(id: string, dto: UpdateTrackDto) {
    const item = await this.findID(id);

    if (!item) throw new NotFoundException();

    return await this.tracksModel.track.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    const item = await this.findID(id);

    if (!item) throw new NotFoundException();

    return await this.tracksModel.track.delete({
      where: { id: id },
    });
  }
}
