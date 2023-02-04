import { Injectable } from '@nestjs/common';
import { AlbumsModel } from './model/albums.model';
import { validate } from 'uuid';
import { BadRequestException } from 'src/common/common.errors';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/create-Album.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly albumsModel: AlbumsModel) {}

  async findAll() {
    return await this.albumsModel.findAll();
  }

  async findOne(id: string) {
    if (validate(id)) return await this.albumsModel.findOne(id);
    else throw new BadRequestException();
  }

  async post(dto: CreateAlbumDto) {
    if (typeof dto.name !== 'string') throw new BadRequestException();
    return await this.albumsModel.post(dto);
  }

  async put(id: string, dto: UpdateAlbumDto) {
    if (!validate(id)) throw new BadRequestException();
    if (typeof dto.name !== 'string') throw new BadRequestException();
    return this.albumsModel.put(id, dto);
  }

  async delete(id: string) {
    if (validate(id)) return await this.albumsModel.delete(id);
    else throw new BadRequestException();
  }
}
