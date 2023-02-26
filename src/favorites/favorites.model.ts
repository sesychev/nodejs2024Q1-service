import { Favorites } from './interfaces/favorite.interface';

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
    return this.favorites.tracks.push(id);
  }

  async postArtist(id: string) {
    this.favorites.artists.push(id);
  }

  async postAlbum(id: string) {
    this.favorites.albums.push(id);
  }

  async deleteTrack(id: string) {
    const index = this.favorites.tracks.findIndex((item) => item === id);
    return this.favorites.tracks.splice(index, 1);
  }

  async deleteArtist(id: string) {
    const index = this.favorites.artists.findIndex((item) => item === id);
    return this.favorites.artists.splice(index, 1);
  }

  async deleteAlbum(id: string) {
    const index = this.favorites.albums.findIndex((item) => item === id);
    return this.favorites.albums.splice(index, 1);
  }
}
