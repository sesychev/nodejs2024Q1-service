import { Module } from '@nestjs/common';
import { TracksModel } from './model/tracks.model';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TracksModel],
})
export class TracksModule {}
