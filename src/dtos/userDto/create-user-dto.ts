import {
	IsEmail,
	IsOptional,
	IsString,
	Length,
	Matches,
	IsNotEmpty,
} from 'class-validator';


export class CreateUserDto {
	@IsNotEmpty()
	@Length(1, 40)
	@IsString()
	firstname: string;

	@IsNotEmpty()
	@Length(1, 40)
	@IsString()
	lastname: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@Matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, {
		message: 'Password should contain minimum eight characters, at least one letter and one number',
	})
	password: string;


}
