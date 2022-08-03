import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ITrackDto } from '../../../shared/interfaces/track';

export class CreateTrackDto implements ITrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
