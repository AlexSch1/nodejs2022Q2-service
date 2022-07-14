import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {UuidGuard} from "../../shared/guards/uuid.guard";

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @UseGuards(UuidGuard)
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(UuidGuard)
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @UseGuards(UuidGuard)
  remove(@Param('id') id: string) {
    return this.albumsService.remove(id);
  }
}
