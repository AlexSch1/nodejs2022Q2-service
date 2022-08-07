import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { ArtistsModule } from './features/artists/artists.module';
import { AlbumsModule } from './features/albums/albums.module';
import { TracksModule } from './features/tracks/tracks.module';
import { FavoritesModule } from './features/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
