import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put, HttpCode, HttpException, HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from '../../shared/interfaces/user';
import { UpdateUserDto } from './dto/update-user.dto';
import { UuidGuard } from '../../shared/guards/uuid.guard';
import { UserGuard } from '../../shared/guards/user.guard';

@Controller('user')
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
  @UseGuards(UuidGuard)
 async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.userExist(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(UuidGuard, UserGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
