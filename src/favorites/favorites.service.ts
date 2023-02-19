import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesModel } from './favorites.model';
import { NotFoundException } from 'src/common/common.errors';

@Injectable()
export class FavoritesService {
  favoritesModel = new FavoritesModel();

  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
  ) {}

  async findAll() {
    return {
      artists: await Promise.all(
        (
          await this.favoritesModel.findAll()
        ).artists.map((item) => this.artistsService.findOne(item)),
      ),
      albums: await Promise.all(
        (
          await this.favoritesModel.findAll()
        ).albums.map((item) => this.albumsService.findOne(item)),
      ),
      tracks: await Promise.all(
        (
          await this.favoritesModel.findAll()
        ).tracks.map((item) => this.tracksService.findOne(item)),
      ),
    };
  }

  async postTrack(id: string) {
    const item = null;
    if (!item) throw new UnprocessableEntityException();
    return this.favoritesModel.postTrack(id);
  }

  async postArtist(id: string) {
    const item = null;
    if (!item) throw new UnprocessableEntityException();
    return this.favoritesModel.postArtist(id);
  }

  async postAlbum(id: string) {
    const item = null;
    if (!item) throw new UnprocessableEntityException();
    return this.favoritesModel.postAlbum(id);
  }

  async deleteTrack(id: string) {
    const item = this.favoritesModel.tracks.find((item) => item === id);
    if (!item) throw new NotFoundException();
    return this.favoritesModel.deleteTrack(id);
  }

  async deleteArtist(id: string) {
    const item = this.favoritesModel.artists.find((item) => item === id);
    if (!item) throw new NotFoundException();
    return this.favoritesModel.deleteArtist(id);
  }

  async deleteAlbum(id: string) {
    const item = this.favoritesModel.albums.find((item) => item === id);
    if (!item) throw new NotFoundException();
    return this.favoritesModel.deleteAlbum(id);
  }
}
