import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UuidGuard } from '../../shared/guards/uuid.guard';
import {AuthGuard} from "../auth/auth-guard";

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const album = await this.albumsService.create(createAlbumDto);
    if (!album) {
      throw new HttpException(
        'Unable to create album',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return album;
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @UseGuards(UuidGuard, AuthGuard)
  async findOne(@Param('id') id: string) {
    const album = await this.albumsService.findOne(id);

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Put(':id')
  @UseGuards(UuidGuard, AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    // return this.albumsService.update(id, updateAlbumDto);

    const albums = await this.albumsService.update(id, updateAlbumDto);
    if (!albums) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return albums;
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(UuidGuard, AuthGuard)
  async remove(@Param('id') id: string) {
    // return this.albumsService.remove(id);

    if (!(await this.albumsService.remove(id))) {
      throw new HttpException('Album  not found', HttpStatus.NOT_FOUND);
    }
  }
}
