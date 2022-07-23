import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {  UserEntity } from './entities/user.entity';
import { FavoritesService } from '../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {UserDto} from "./dto/user.dto";

@Injectable()
export class UsersService {
  // db: InMemoryDB;
  //
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private favoritesService: FavoritesService,
  ) {
    // this.db = db;
  }

  // async userExist(id: string) {
  //   const user = await this.db.getEntity(USERS_TABLE, id);
  //   return !!user;
  // }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = this.usersRepository.create(createUserDto);

    return  (await this.usersRepository.save(user)).toResponse()
    // const user = new User(createUserDto.login, createUserDto.password);
    // await this.db.createEntity(USERS_TABLE, user);
    // return User.toSource(user);
  }

  async findAll(): Promise<UserDto[]> {
    return this.usersRepository.find()
    // const users = await this.db.getAllEntities<IUser>(USERS_TABLE);
    //
    // return users.map((user) => User.toSource(user));
  }

  async findOne(id: string): Promise<UserDto | undefined> {
    // const user = await this.db.getEntity<IUser>(USERS_TABLE, id);
    // return User.toSource(user);
    return this.usersRepository.findOne({ where: {id}});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // const user = await this.db.getEntity<IUser>(USERS_TABLE, id);
    //
    // if (user.password !== updateUserDto.oldPassword) {
    //   throw new HttpException('Incorrect oldPassword', HttpStatus.FORBIDDEN);
    // }
    //
    // const updatedUser = await this.db.updateEntity(USERS_TABLE, {
    //   ...user,
    //   version: ++user.version,
    //   password: updateUserDto.newPassword,
    //   updatedAt: Date.now(),
    // });
    //
    // return User.toSource(updatedUser);
    const user: UserDto = await this.findOne(id);

    if (!user) return;

    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: string) {
    return Boolean((await this.usersRepository.delete(id)).affected);
    // await this.db.removeEntity(USERS_TABLE, id);
    // await this.favoritesService.resetFavs();
    //
    // return;
  }
}
