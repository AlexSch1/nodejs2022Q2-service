import {IsNotEmpty, IsString} from "class-validator";

export class UpdateUserDto {
	@IsNotEmpty()
	@IsString()
	oldPassowrd: string;

	@IsNotEmpty()
	@IsString()
	newPassword: string;
}
