export interface IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserDto = Omit<IUser, 'id'>;
