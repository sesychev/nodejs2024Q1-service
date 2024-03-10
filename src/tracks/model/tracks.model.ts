import { v4 } from 'uuid';
import { Track } from '../interfaces/track.interface';
import { NotFoundException } from 'src/common/common.errors';
import { CreateTrackDto, UpdateTrackDto } from '../dto/create-track.dto';
import { FavoritesModel } from 'src/favorites/favorites.model';

export class ClassTrack implements Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor(
    name: string,
    duration: number,
    artistId?: string,
    albumId?: string,
  ) {
    this.id = v4();
    this.name = name;
    this.artistId = artistId || null;
    this.albumId = albumId || null;
    this.duration = duration;
  }
}

export class TracksModel {
  favorites = new FavoritesModel();

  private tracks: Array<ClassTrack> = [];

  public async findAll() {
    return this.tracks;
  }

  public async findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException();
    return track;
  }

  public async post(dto: CreateTrackDto) {
    const track = new ClassTrack(
      dto.name,
      dto.duration,
      dto.artistId,
      dto.albumId,
    );
    this.tracks.push(track);
    return track;
  }

  public async put(id: string, dto: UpdateTrackDto) {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException();
    track.name = dto.name;
    track.duration = dto.duration;
    track.artistId = dto.artistId || track.artistId;
    track.albumId = dto.albumId || track.albumId;
    return track;
  }

  public async delete(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index < 0) throw new NotFoundException();

    this.tracks.splice(index, 1);
    await this.favorites.deleteTrack(id);
  }

  public async artistNull(id: string) {
    this.tracks.forEach((item) => {
      if (item.artistId === id) item.artistId = null;
    });
  }

  public async albumNull(id: string) {
    this.tracks.forEach((item) => {
      if (item.albumId === id) item.albumId = null;
    });
  }

  findTrack(id: string) {
    return this.tracks.find((item) => item.id === id);
  }
}
