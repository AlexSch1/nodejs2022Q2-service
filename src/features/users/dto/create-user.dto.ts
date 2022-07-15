import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IUser } from '../../../shared/interfaces/user';

export class CreateUserDto implements IUser {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  @IsOptional()
  version: number;

  @IsInt()
  @IsOptional()
  createdAt: number;

  @IsInt()
  @IsOptional()
  updatedAt: number;
}
