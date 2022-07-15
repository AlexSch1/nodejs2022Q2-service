import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateAlbumDto} from './dto/create-album.dto';
import {UpdateAlbumDto} from './dto/update-album.dto';
import db, {ALBUMS_TABLE, InMemoryDB, tableNames,} from '../../core/db';
import {v4} from "uuid";
import {Album} from "../../shared/interfaces/album";

@Injectable()
export class AlbumsService {db: InMemoryDB;

  constructor() {
    this.db = db;
  }

  async albumExist(id: string) {
    const album = await this.db.getEntity(ALBUMS_TABLE, id);
    return !!album;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      ...createAlbumDto,
      id: v4(),
    }
    await this.db.createEntity(ALBUMS_TABLE, newAlbum);

    return newAlbum;
  }

  async findAll() {
    return await this.db.getAllEntities<tableNames, Album>(ALBUMS_TABLE);
  }

  async findOne(id: string) {
    if (!(await this.albumExist(id))) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return await this.db.getEntity<tableNames, Album>(ALBUMS_TABLE, id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!(await this.albumExist(id))) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    const artist = await this.db.getEntity<tableNames, Album>(
        ALBUMS_TABLE,
        id,
    );

    return this.db.updateEntity(ALBUMS_TABLE, {
      ...artist,
      ...updateAlbumDto,
    });
  }

  async remove(id: string) {
    await this.db.removeEntity(ALBUMS_TABLE, id);

    return 'OK';
  }
}
