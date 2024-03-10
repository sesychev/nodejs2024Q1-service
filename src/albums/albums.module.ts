import { Module } from '@nestjs/common';
import { AlbumsModel } from './model/albums.model';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsModel],
})
export class AlbumsModule {}
