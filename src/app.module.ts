import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { ArtistsModule } from './features/artists/artists.module';
import { AlbumsModule } from './features/albums/albums.module';
import { TracksModule } from './features/tracks/tracks.module';
import { FavoritesModule } from './features/favorites/favorites.module';

@Module({
  imports: [UsersModule, ArtistsModule, AlbumsModule, TracksModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
