import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesModel } from './favorites.model';

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
    const item = await this.tracksService.findTack(id);
    if (!item) throw new UnprocessableEntityException();
    return this.favoritesModel.postTrack(id);
  }

  async deleteTrack(id: string) {
    return this.favoritesModel.deleteTrack(id);
  }

  async postArtist(id: string) {
    const item = await this.artistsService.findArtist(id);
    if (!item) throw new UnprocessableEntityException();
    return this.favoritesModel.postArtist(id);
  }

  async deleteArtist(id: string) {
    return this.favoritesModel.deleteArtist(id);
  }

  async postAlbum(id: string) {
    const item = await this.albumsService.findAlbum(id);
    if (!item) throw new UnprocessableEntityException();
    return this.favoritesModel.postAlbum(id);
  }

  async deleteAlbum(id: string) {
    return this.favoritesModel.deleteAlbum(id);
  }
}
