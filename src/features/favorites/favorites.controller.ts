import {Controller, Get, Post, Param, Delete, UseGuards, HttpCode} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {UuidGuard} from "../../shared/guards/uuid.guard";

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}


  @Get()
  findFavs() {
    return  this.favoritesService.findFavs();
  }

  @Post('/track/:id')
  @HttpCode(201)
  @UseGuards(UuidGuard)
  addTack(@Param() id: string) {
    return this.favoritesService.addToFavouritesTrack(id);
  }
  @Post('/album/:id')
  @HttpCode(201)
  @UseGuards(UuidGuard)
  addAlbum(@Param() id: string) {
    return this.favoritesService.addToFavouritesAlbum(id);
  }
  @Post('/artist/:id')
  @HttpCode(201)
  @UseGuards(UuidGuard)
  addArtist(@Param() id: string) {
    return this.favoritesService.addToFavouritesArtist(id);
  }

  @Delete('/track/:id')
  @UseGuards(UuidGuard)
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.removeTrackFromFavourites(id);
  }
  @Delete('/artist/:id')
  @UseGuards(UuidGuard)
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.removeArtistFromFavourites(id);
  }
  @Delete('/album/:id')
  @UseGuards(UuidGuard)
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.removeAlbumFromFavourites(id);
  }
}
