import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateInstituicaoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  telefone: string;
  
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}|\d{14})$/,
    { message: 'CNPJ inválido. Use o formato 00.000.000/0000-00 ou 14 dígitos numéricos.' }
  )
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  endereco: string;
}

