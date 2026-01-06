import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AdminSigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}
