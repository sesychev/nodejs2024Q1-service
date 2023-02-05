import { Injectable } from '@nestjs/common';
import { TracksModel } from '../tracks/model/tracks.model';
import { validate } from 'uuid';
import { BadRequestException } from 'src/common/common.errors';
import { CreateTrackDto, UpdateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TracksService {
  constructor(private readonly tracksModel: TracksModel) {}

  async findAll() {
    return await this.tracksModel.findAll();
  }

  async findOne(id: string) {
    if (validate(id)) return await this.tracksModel.findOne(id);
    else throw new BadRequestException();
  }

  async post(dto: CreateTrackDto) {
    return await this.tracksModel.post(dto);
  }

  async put(id: string, dto: UpdateTrackDto) {
    if (validate(id)) return this.tracksModel.put(id, dto);
    else throw new BadRequestException();
  }

  async delete(id: string) {
    if (validate(id)) return await this.tracksModel.delete(id);
    else throw new BadRequestException();
  }
}
