import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;
}