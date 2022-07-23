import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
// import db, {
//   ALBUMS_TABLE,
//   ARTISTS_TABLE,
//   InMemoryDB,
//   TRACKS_TABLE,
// } from '../../core/db';
import { IArtist } from '../../shared/interfaces/artist';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {

  constructor(@InjectRepository(ArtistEntity) private artistRepository) {
  }

  // async artistExist(id: string) {
  //   const artist = await this.db.getEntity(ARTISTS_TABLE, id);
  //   return !!artist;
  // }

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = this.artistRepository.create(createArtistDto);

    return await this.artistRepository.save(newArtist);
  }

  async findAll(): Promise<IArtist[]> {
    return this.artistRepository.find();
  }

  async findOne(id: string) {
    // if (!(await this.artistExist(id))) {
    //   throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    // }
    // return await this.db.getEntity<Artist>(ARTISTS_TABLE, id);
    return this.artistRepository.findOne(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    // if (!(await this.artistExist(id))) {
    //   throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    // }
    //
    const artist = await this.findOne(id);
    if (!artist) return;

    return this.artistRepository.save({ ...artist, ...updateArtistDto });
    //
    // return this.db.updateEntity(ARTISTS_TABLE, {
    //   ...artist,
    //   ...updateArtistDto,
    // });
  }

  async remove(id: string) {
    return Boolean((await this.artistRepository.delete(id)).affected);
    // if (!(await this.artistExist(id))) {
    //   throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    // }
    //
    // await this.db.removeEntity(ARTISTS_TABLE, id);
    // this.db.removeFromFavourites(ARTISTS_TABLE, id);
    // this.db.unrefIds(TRACKS_TABLE, id, 'artist');
    // this.db.unrefIds(ALBUMS_TABLE, id, 'artist');
    //
    // return;
  }
}
