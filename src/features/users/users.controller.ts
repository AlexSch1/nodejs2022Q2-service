import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from '../../shared/interfaces/user';
import { UpdateUserDto } from './dto/update-user.dto';
import { UuidGuard } from '../../shared/guards/uuid.guard';
import { UserGuard } from '../../shared/guards/user.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): any {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<IUser[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(UuidGuard, UserGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(UuidGuard, UserGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(UuidGuard, UserGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}