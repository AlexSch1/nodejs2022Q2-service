import {MiddlewareConsumer, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { ArtistsModule } from './features/artists/artists.module';
import { AlbumsModule } from './features/albums/albums.module';
import { TracksModule } from './features/tracks/tracks.module';
import { FavoritesModule } from './features/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { LoggerModule } from './shared/logging/logging.module';
import { HttpExceptionFilter } from './core/http-exception-filter';
import { APP_FILTER } from '@nestjs/core';
import {LoggerMiddleware} from "./core/logger-middleware";

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
    // AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
