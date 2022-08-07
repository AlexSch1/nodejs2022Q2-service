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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UuidGuard } from '../../shared/guards/uuid.guard';
import {AuthGuard} from "../auth/auth-guard";

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createArtistDto: CreateArtistDto) {
    const artist = await this.artistsService.create(createArtistDto);
    if (!artist) {
      throw new HttpException(
        'Unable to create artist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return artist;
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  @UseGuards(UuidGuard, AuthGuard)
  async findOne(@Param('id') id: string) {
    // return this.artistsService.findOne(id);

    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Put(':id')
  @UseGuards(UuidGuard, AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    // return this.artistsService.update(id, updateArtistDto);

    const artist = await this.artistsService.update(id, updateArtistDto);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(UuidGuard, AuthGuard)
  async remove(@Param('id') id: string) {
    // return this.artistsService.remove(id);
    if (!(await this.artistsService.remove(id))) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
