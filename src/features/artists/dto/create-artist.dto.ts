import {IsBoolean, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateArtistDto {
	@IsString()
	@IsOptional()
	id: string;

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsBoolean()
	grammy: boolean;
}
