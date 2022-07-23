import {IsInt, IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  id: string;

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
