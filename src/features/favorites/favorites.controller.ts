import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UuidGuard } from '../../shared/guards/uuid.guard';
import { FavoritesEnum } from '../../shared/interfaces/favorites';
import {AuthGuard} from "../auth/auth-guard";

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  @UseGuards(AuthGuard)
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  @UseGuards(UuidGuard, AuthGuard)
  @HttpCode(201)
  addTrack(@Param('id') id: string) {
    return this.favoritesService.add(FavoritesEnum.Tracks, id);
  }

  @Delete('track/:id')
  @UseGuards(UuidGuard, AuthGuard)
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.remove(FavoritesEnum.Tracks, id);
  }

  @Post('artist/:id')
  @UseGuards(UuidGuard, AuthGuard)
  @HttpCode(201)
  addArtist(@Param('id') id: string) {
    return this.favoritesService.add(FavoritesEnum.Artists, id);
  }

  @Delete('artist/:id')
  @UseGuards(UuidGuard, AuthGuard)
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.remove(FavoritesEnum.Artists, id);
  }

  @Post('album/:id')
  @UseGuards(UuidGuard, AuthGuard)
  @HttpCode(201)
  addAlbum(@Param('id') id: string) {
    return this.favoritesService.add(FavoritesEnum.Albums, id);
  }

  @Delete('album/:id')
  @UseGuards(UuidGuard, AuthGuard)
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.remove(FavoritesEnum.Albums, id);
  }
}
