import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  //
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  // async albumExist(id: string) {
  //   const album = await this.db.getEntity(ALBUMS_TABLE, id);
  //   return !!album;
  // }

  async create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepository.create(createAlbumDto);

    return await this.albumRepository.save(album);
  }

  async findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    return this.albumRepository.findOne({ where: { id } });
    // if (!(await this.albumExist(id))) {
    //   throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    // }
    // return await this.db.getEntity<Album>(ALBUMS_TABLE, id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);

    if (!album) return;

    return await this.albumRepository.save({
      ...album,
      ...updateAlbumDto,
    });

    // if (!(await this.albumExist(id))) {
    //   throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    // }
    //
    // const artist = await this.db.getEntity<Album>(ALBUMS_TABLE, id);
    //
    // return this.db.updateEntity(ALBUMS_TABLE, {
    //   ...artist,
    //   ...updateAlbumDto,
    // });
  }

  async remove(id: string) {
	  return Boolean((await this.albumRepository.delete(id)).affected);
    // if (!(await this.albumExist(id))) {
    //   throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    // }
	//
    // await this.db.removeEntity(ALBUMS_TABLE, id);
    // this.db.removeFromFavourites(ALBUMS_TABLE, id);
    // this.db.unrefIds(TRACKS_TABLE, id, 'album');
	//
    // return;
  }
}
