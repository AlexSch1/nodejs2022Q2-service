import {forwardRef, Module} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [forwardRef(() => AuthModule),TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
