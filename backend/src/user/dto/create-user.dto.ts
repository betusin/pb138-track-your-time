import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  surname: string;

  @IsString()
  company: string;

  @IsString()
  logo: string;
}
