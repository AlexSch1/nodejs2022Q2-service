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

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
