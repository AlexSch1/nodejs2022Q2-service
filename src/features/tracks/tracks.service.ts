import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './entities/track.entity';
import {CreateTrackDto} from "./dto/create-track.dto";
import {UpdateTrackDto} from "./dto/update-track.dto";

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  // async trackExist(id: string) {
  //   const track = await this.db.getEntity(TRACKS_TABLE, id);
  //   return !!track;
  // }

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = this.trackRepository.create(createTrackDto);

    return await this.trackRepository.save(newTrack);
  }

  async findAll() {
    return this.trackRepository.find();
  }

  async findOne(id: string) {
    return this.trackRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);

    if (!track) return;

    return await this.trackRepository.save({
      ...track,
      ...updateTrackDto,
    });
  }

  async remove(id: string) {
    return Boolean((await this.trackRepository.delete(id)).affected);
  }
}
