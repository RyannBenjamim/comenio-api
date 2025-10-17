import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  senha: string;
}