import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesModel } from './favorites.model';
import { AlbumsModel } from 'src/albums/model/albums.model';
import { ArtistsModel } from 'src/artists/model/artists.model';
import { TracksModel } from 'src/tracks/model/tracks.model';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    AlbumsService,
    ArtistsService,
    TracksService,
    FavoritesModel,
    AlbumsModel,
    ArtistsModel,
    TracksModel,
  ],
})
export class FavoritesModule {}
