import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IArtistDto } from '../../../shared/interfaces/artist';

export class CreateArtistDto implements IArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
