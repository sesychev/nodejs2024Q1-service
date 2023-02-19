import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/common/common.errors';
import { CreateArtistDto, UpdateArtistDto } from './dto/create-Artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(private readonly artistsModel: PrismaService) {}

  async findAll() {
    return await this.artistsModel.artist.findMany();
  }

  async findID(id: string) {
    return await this.artistsModel.artist.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOne(id: string) {
    const item = await this.findID(id);

    if (!item) throw new NotFoundException();
  }

  async post(dto: CreateArtistDto) {
    const item = {
      id: v4(),
      ...dto,
    };

    return await this.artistsModel.artist.create({ data: item });
  }

  async put(id: string, dto: UpdateArtistDto) {
    const item = await this.findID(id);

    if (!item) throw new NotFoundException();

    return await this.artistsModel.artist.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    const item = await this.findID(id);

    if (!item) throw new NotFoundException();

    await this.artistsModel.album.updateMany({
      where: { artistId: { equals: id } },
      data: { artistId: null },
    });

    await this.artistsModel.track.updateMany({
      where: { artistId: { equals: id } },
      data: { artistId: null },
    });

    await this.artistsModel.artist.delete({
      where: { id: id },
    });

    return item;
  }
}
