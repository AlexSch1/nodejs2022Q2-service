import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = this.usersRepository.create(createUserDto);

    return (await this.usersRepository.save(user)).toResponse();
  }

  async findAll() {
    const users = await this.usersRepository.find();

    return users.map((u) => u.toResponse());
  }

  async findByLogin(login: string) {
    const user = await this.usersRepository.findOne({ where: { login } });

    return user;
  }

  async findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) return;

    if (!(await bcrypt.compare(updateUserDto.oldPassword, user.password))) {
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
