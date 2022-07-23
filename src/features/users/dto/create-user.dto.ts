import {IsDate, IsInt, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {IUserDto} from '../../../shared/interfaces/user';

export class CreateUserDto implements IUserDto {
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
  createdAt: Date;

  @IsInt()
  @IsOptional()
  updatedAt: Date;
}
