import { Module } from '@nestjs/common';
import { ArtistsModel } from './model/artists.model';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsModel],
})
export class ArtistsModule {}
