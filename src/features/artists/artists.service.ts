import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtist } from '../../shared/interfaces/artist';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(@InjectRepository(ArtistEntity) private artistRepository) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = this.artistRepository.create(createArtistDto);

    return await this.artistRepository.save(newArtist);
  }

  async findAll(): Promise<IArtist[]> {
    return this.artistRepository.find();
  }

  async findOne(id: string) {
    return this.artistRepository.findOne({ where: { id } });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    if (!artist) return;

    return this.artistRepository.save({ ...artist, ...updateArtistDto });
  }

  async remove(id: string) {
    return Boolean((await this.artistRepository.delete(id)).affected);
  }
}
