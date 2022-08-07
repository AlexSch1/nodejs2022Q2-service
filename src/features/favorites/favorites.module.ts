import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import {AuthModule} from "../auth/auth.module";
import {TracksModule} from "../tracks/tracks.module";
import {AlbumsModule} from "../albums/albums.module";
import {ArtistsModule} from "../artists/artists.module";

@Module({
  imports: [
    TracksModule,
    AlbumsModule,
    ArtistsModule,
    TypeOrmModule.forFeature([FavoriteEntity]),
    AuthModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
