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
import { UsersService } from './users.service';
import {CreateUserDto, } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UuidGuard } from '../../shared/guards/uuid.guard';
import { UserGuard } from '../../shared/guards/user.guard';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    if (!user) {
      throw new HttpException(
        'Unable to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return user;
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(UuidGuard, UserGuard)
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user.toResponse();
  }

  @Put(':id')
  @UseGuards(UuidGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {

    const user = await this.usersService.update(id, updateUserDto);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(UuidGuard, UserGuard)
  async remove(@Param('id') id: string): Promise<void> {
    if (!(await this.usersService.remove(id))) {
      throw new HttpException(
        'User  not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
