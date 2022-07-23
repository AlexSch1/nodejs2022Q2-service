import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { FavoritesService } from '../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private favoritesService: FavoritesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = this.usersRepository.create(createUserDto);

    return (await this.usersRepository.save(user)).toResponse();
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) return;

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Incorrect oldPassword', HttpStatus.FORBIDDEN);
    }

    const { password, ...userResp } = await this.usersRepository.save({
      ...user,
      password: updateUserDto.newPassword,
    });

    return userResp;
  }

  async remove(id: string) {
    return Boolean((await this.usersRepository.delete(id)).affected);
  }
}
