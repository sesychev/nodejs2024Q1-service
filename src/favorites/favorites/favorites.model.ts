import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';
import { Favorites } from './interfaces/favorite.interface';
import { TracksService } from 'src/tracks/tracks.service';

export class FavoritesModel implements Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async findAll() {
    return this.favorites;
  }

  async postTrack(id: string) {
    this.favorites.tracks.push(id);
  }

  async deleteTrack(id: string) {
    const index = this.favorites.tracks.findIndex((item) => item === id);
    if (index > -1) this.favorites.tracks.splice(index, 1);
    else throw new NotFoundException();
  }

  async postArtist(id: string) {
    this.favorites.artists.push(id);
  }

  async deleteArtist(id: string) {
    const index = this.favorites.artists.findIndex((item) => item === id);
    if (index > -1) this.favorites.artists.splice(index, 1);
    else throw new NotFoundException();
  }

  async postAlbum(id: string) {
    this.favorites.albums.push(id);
  }

  async deleteAlbum(id: string) {
    const index = this.favorites.albums.findIndex((item) => item === id);
    if (index > -1) this.favorites.albums.splice(index, 1);
    else throw new NotFoundException();
  }
}
