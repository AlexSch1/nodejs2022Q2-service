import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import db, {
  ALBUMS_TABLE,
  ARTISTS_TABLE,
  InMemoryDB,
  TRACKS_TABLE,
} from '../../core/db';
import { Artist } from '../../shared/interfaces/artist';
import { v4 } from 'uuid';

@Injectable()
export class ArtistsService {
  db: InMemoryDB;

  constructor() {
    this.db = db;
  }

  async artistExist(id: string) {
    const artist = await this.db.getEntity(ARTISTS_TABLE, id);
    return !!artist;
  }

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      ...createArtistDto,
      id: v4(),
    };
    await this.db.createEntity(ARTISTS_TABLE, newArtist);

    return newArtist;
  }

  async findAll(): Promise<Artist[]> {
    return await this.db.getAllEntities<Artist>(ARTISTS_TABLE);
  }

  async findOne(id: string) {
    if (!(await this.artistExist(id))) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return await this.db.getEntity<Artist>(ARTISTS_TABLE, id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!(await this.artistExist(id))) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    const artist = await this.db.getEntity<Artist>(ARTISTS_TABLE, id);

    return this.db.updateEntity(ARTISTS_TABLE, {
      ...artist,
      ...updateArtistDto,
    });
  }

  async remove(id: string) {
    if (!(await this.artistExist(id))) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    await this.db.removeEntity(ARTISTS_TABLE, id);
    this.db.removeFromFavourites(ARTISTS_TABLE, id);
    this.db.unrefIds(TRACKS_TABLE, id, 'artist');
    this.db.unrefIds(ALBUMS_TABLE, id, 'artist');

    return;
  }
}
