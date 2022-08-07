import { Injectable } from '@nestjs/common';
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

  async create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepository.create(createAlbumDto);

    return await this.albumRepository.save(album);
  }

  async findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    return this.albumRepository.findOne({ where: { id } });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);

    if (!album) return;

    return await this.albumRepository.save({
      ...album,
      ...updateAlbumDto,
    });
  }

  async remove(id: string) {
    return Boolean((await this.albumRepository.delete(id)).affected);
  }
}
