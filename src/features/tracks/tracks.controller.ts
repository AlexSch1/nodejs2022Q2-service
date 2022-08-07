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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UuidGuard } from '../../shared/guards/uuid.guard';
import {AuthGuard} from "../auth/auth-guard";

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createTrackDto: CreateTrackDto) {
    const track = await this.tracksService.create(createTrackDto);
    if (!track) {
      throw new HttpException(
        'Unable to create track',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return track;
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @UseGuards(UuidGuard, AuthGuard)
  async findOne(@Param('id') id: string) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Put(':id')
  @UseGuards(UuidGuard, AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.tracksService.update(id, updateTrackDto);
    if (!track) {
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(UuidGuard, AuthGuard)
  async remove(@Param('id') id: string) {
    if (!(await this.tracksService.remove(id))) {
      throw new HttpException('Track  not found', HttpStatus.NOT_FOUND);
    }
  }
}
