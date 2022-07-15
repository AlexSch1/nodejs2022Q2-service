import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import db, { TRACKS_TABLE, InMemoryDB, tableNames } from '../../core/db';
import { v4 } from 'uuid';
import { Artist } from '../../shared/interfaces/artist';
import { Track } from '../../shared/interfaces/track';

@Injectable()
export class TracksService {
  db: InMemoryDB;

  constructor() {
    this.db = db;
  }

  async trackExist(id: string) {
    const track = await this.db.getEntity(TRACKS_TABLE, id);
    return !!track;
  }

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      ...createTrackDto,
      id: v4(),
    };

    await this.db.createEntity(TRACKS_TABLE, newTrack);

    return newTrack;
  }

  async findAll() {
    return await this.db.getAllEntities<tableNames, Track>(TRACKS_TABLE);
  }

  async findOne(id: string) {
    if (!(await this.trackExist(id))) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return await this.db.getEntity<tableNames, Artist>(TRACKS_TABLE, id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!(await this.trackExist(id))) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    const track = await this.db.getEntity<tableNames, Track>(TRACKS_TABLE, id);

    return this.db.updateEntity(TRACKS_TABLE, {
      ...track,
      ...updateTrackDto,
    });
  }

  async remove(id: string) {
    await this.db.removeEntity(TRACKS_TABLE, id);
    this.db.removeFromFavourites(TRACKS_TABLE, id);

    return 'OK';
  }
}
