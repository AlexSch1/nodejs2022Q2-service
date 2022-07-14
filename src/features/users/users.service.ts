import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UpdateUserDto} from './dto/update-user.dto';
import db, {InMemoryDB, USERS_TABLE} from '../../core/db';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './entities/user.entity';

@Injectable()
export class UsersService {
  db: InMemoryDB;

  constructor() {
    this.db = db;
  }

  async userExist(id: string) {
    const user = await this.db.getEntity(USERS_TABLE, id);
    return !!user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto.login, createUserDto.password);
    await this.db.createEntity(USERS_TABLE, user);
    return User.toSource(user);
  }

  async findAll() {
    const users = await this.db.getAllEntities(USERS_TABLE);

    return users.map((user) => User.toSource(user));
  }

  async findOne(id: string) {
    const user = await this.db.getEntity(USERS_TABLE, id);
    return User.toSource(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.db.getEntity(USERS_TABLE, id);

    if (user.password !== updateUserDto.oldPassowrd) {
      throw new HttpException('Incorrect oldPassowrd', HttpStatus.FORBIDDEN);
    }

    const updatedUser = await this.db.updateEntity(USERS_TABLE, {
      ...user,
      version: ++user.version,
      password: updateUserDto.newPassword,
      updatedAt: Date.now(),
    });

    return User.toSource(updatedUser);
  }

  async remove(id: string) {
    await this.db.removeEntity(USERS_TABLE, id);

    return true;
  }
}
