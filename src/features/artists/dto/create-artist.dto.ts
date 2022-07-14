import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateArtistDto {
	@IsString()
	@IsOptional()
	id: string;

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	grammy: boolean;
}
