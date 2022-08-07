import {forwardRef, Module} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
