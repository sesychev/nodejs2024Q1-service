import { v4 } from 'uuid';
import { Artist } from '../interfaces/Artist.interface';
import { NotFoundException } from 'src/common/common.errors';
import { CreateArtistDto, UpdateArtistDto } from '../dto/create-Artist.dto';
import { TracksModel } from 'src/tracks/model/tracks.model';

class ClassArtist implements Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
  constructor(name: string, grammy: boolean) {
    this.id = v4();
    this.name = name;
    this.grammy = grammy;
  }
}

export class ArtistsModel {
  tracks = new TracksModel();

  private artists: Array<ClassArtist> = [];

  public async findAll() {
    return this.artists;
  }

  public async findOne(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  public async post(dto: CreateArtistDto) {
    const artist = new ClassArtist(dto.name, dto.grammy);
    this.artists.push(artist);
    return artist;
  }

  public async put(id: string, dto: UpdateArtistDto) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException();
    artist.name = dto.name;
    artist.grammy = dto.grammy;
    return artist;
  }

  public async delete(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException();
    this.tracks.deleteArtist(id);
    this.tracks.deleteAlbum(id);
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(index, 1);
  }
}
