import { v4 } from 'uuid';
import { IUser } from '../../../shared/interfaces/user';

export class User implements IUser {
  id: string = v4();
  version = 1;
  createdAt: number = Date.now();
  updatedAt: number = Date.now();

  constructor(public login: string, public password: string) {}

  static toSource(user: IUser) {
    const { password, ...userDto } = user;
    return userDto;
  }
}
