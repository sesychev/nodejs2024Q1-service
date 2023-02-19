import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/common/common.errors';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/create-Album.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(private readonly albumsModel: PrismaService) {}

  async findAll() {
    return await this.albumsModel.album.findMany();
  }

  async findID(id: string) {
    return await this.albumsModel.album.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOne(id: string) {
    const item = await this.findID(id);

    if (!item) throw new NotFoundException();
  }

  async post(dto: CreateAlbumDto) {
    const item = {
      id: v4(),
      ...dto,
    };

    return await this.albumsModel.album.create({ data: item });
  }

  async put(id: string, dto: UpdateAlbumDto) {
    const item = await this.findID(id);

    if (!item) throw new NotFoundException();

    return await this.albumsModel.album.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    const item = await this.findID(id);

    if (!item) throw new NotFoundException();

    await this.albumsModel.album.updateMany({
      where: { artistId: { equals: id } },
      data: { artistId: null },
    });

    await this.albumsModel.album.delete({
      where: { id: id },
    });

    return item;
  }
}
