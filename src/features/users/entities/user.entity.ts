import { IUser } from '../../../shared/interfaces/user';
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserDto} from "../dto/user.dto";

@Entity({ name: 'user' })
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  version: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column('varchar')
  login: string;

  @Column('varchar')
  password: string;

  // static
  toResponse(): UserDto {
    // if (!user) return undefined;

    const { password, ...userDto } = this;

    return userDto;
  }
}
