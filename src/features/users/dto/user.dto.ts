import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDate,
} from 'class-validator';
import { IUser } from '../../../shared/interfaces/user';

export class UserDto implements Partial<IUser> {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsInt()
  @IsOptional()
  version: number;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
