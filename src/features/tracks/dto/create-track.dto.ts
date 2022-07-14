import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsNullable } from '../../albums/dto/create-album.dto';

export class CreateTrackDto {
  @IsString()
  @IsOptional()
  id: string; // uuid v4

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNullable()
  artistId: string | null;

  @IsString()
  @IsNullable()
  albumId: string | null;

  @IsString()
  @IsNullable()
  duration: string | null;
}
