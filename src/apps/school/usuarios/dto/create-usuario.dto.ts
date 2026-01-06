import { IsString, IsEmail, IsDateString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { Cargo } from '@prisma/client';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  primeiroNome: string;

  @IsString()
  @IsNotEmpty()
  sobrenome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsDateString()
  @IsNotEmpty()
  dataNascimento: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsEnum(Cargo)
  @IsNotEmpty()
  cargo: Cargo;
}

