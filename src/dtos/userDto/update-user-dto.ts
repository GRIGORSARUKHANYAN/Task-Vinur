import { IsDate, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @Length(3, 40)
  @IsString()
  firstname: string;

  @IsOptional()
  @Length(3, 40)
  @IsString()
  lastname: string;


  @IsOptional()
  @IsString()
  aboutMe: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsDate()
  isOnline: Date;
}
