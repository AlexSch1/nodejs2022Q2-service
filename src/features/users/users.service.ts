import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UpdateUserDto} from './dto/update-user.dto';
import db, {InMemoryDB, tableNames, USERS_TABLE} from '../../core/db';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './entities/user.entity';
import {IUser} from "../../shared/interfaces/user";
import {FavoritesService} from "../favorites/favorites.service";

@Injectable()
export class UsersService {
  db: InMemoryDB;

  constructor(private favoritesService: FavoritesService) {
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

  async findAll(): Promise<IUser[]> {
    const users = await this.db.getAllEntities<tableNames, IUser>(USERS_TABLE);

    return users.map((user) => User.toSource(user));
  }

  async findOne(id: string) {
    const user = await this.db.getEntity<tableNames, IUser>(USERS_TABLE, id);
    return User.toSource(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.db.getEntity<tableNames, IUser>(USERS_TABLE, id);

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Incorrect oldPassword', HttpStatus.FORBIDDEN);
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
    await this.favoritesService.resetFavs();

    return;
  }
}
