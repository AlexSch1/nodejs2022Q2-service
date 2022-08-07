import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { genSaltSync, hashSync } from 'bcryptjs';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({
    transformer: {
      from: (value: Date) => value.getTime(),
      to: (value: Date) => value,
    },
  })
  createdAt: number;

  @UpdateDateColumn({
    transformer: {
      from: (value: Date) => value.getTime(),
      to: (value: Date) => value,
    },
  })
  updatedAt: number;

  @Column('varchar')
  login: string;

  @Column('varchar')
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = genSaltSync(10);

    let passwordDecoded;

    if (this.password) {
      passwordDecoded = hashSync(this.password, salt);
    } else {
      passwordDecoded = this.password;
    }

    this.password = passwordDecoded;
  }

  toResponse(): UserDto {
    const { password, ...userDto } = this;

    return userDto;
  }
}
