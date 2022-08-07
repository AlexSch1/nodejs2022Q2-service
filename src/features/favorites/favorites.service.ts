import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { FavoriteEntity } from './entities/favorite.entity';
import { FavoritesEnum } from '../../shared/interfaces/favorites';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FavoritesService {
  initialFavorites = {
    albums: [],
    artists: [],
    tracks: [],
  };
  constructor(
    @InjectRepository(FavoriteEntity) private favoritesRepository,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
    private artistsService: ArtistsService,
  ) {}

  async add(favoritesType: FavoritesEnum, id: string) {
    try {
      const service = this[`${favoritesType}Service`];

      const entityItem = await service.findOne(id);
      if (!entityItem) {
        throw new Error();
      }
      let favorites = await this.favoritesRepository.findOne({ where: {} });

      if (!favorites) {
        favorites = this.initialFavorites;
      }

      if (!favorites[favoritesType]) {
        favorites[favoritesType] = [];
      }

      favorites[favoritesType].push(entityItem);

      await this.favoritesRepository.save(favorites);

      return id;
    } catch (e) {
      throw new HttpException(
        'UNPROCESSABLE_ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async remove(favoritesType: FavoritesEnum, favoritesId: string) {
    const favorites = await this.getFavorites();
    const indexEntity = favorites[favoritesType].findIndex(
      ({ id }) => favoritesId === id,
    );

    if (indexEntity === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    favorites[favoritesType].splice(indexEntity, 1);

    await this.favoritesRepository.save(favorites);

    return favoritesId;
  }

  async getFavorites() {
    const favorites = await this.favoritesRepository.findOne({
      where: {},
      relations: ['artists', 'albums', 'tracks'],
    });

    if (favorites) return favorites;

    return this.initialFavorites;
  }
}
