import { Injectable } from '@nestjs/common';
import { ArtistsModel } from './model/artists.model';
import { validate } from 'uuid';
import { BadRequestException } from 'src/common/common.errors';
import { CreateArtistDto, UpdateArtistDto } from './dto/create-Artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly artistsModel: ArtistsModel) {}

  async findAll() {
    return await this.artistsModel.findAll();
  }

  async findOne(id: string) {
    if (validate(id)) return await this.artistsModel.findOne(id);
    else throw new BadRequestException();
  }

  async post(dto: CreateArtistDto) {
    return await this.artistsModel.post(dto);
  }

  async put(id: string, dto: UpdateArtistDto) {
    if (!validate(id)) throw new BadRequestException();
    return this.artistsModel.put(id, dto);
  }

  async delete(id: string) {
    if (validate(id)) return await this.artistsModel.delete(id);
    else throw new BadRequestException();
  }
}
