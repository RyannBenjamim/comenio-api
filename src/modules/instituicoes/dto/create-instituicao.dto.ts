import { IsNotEmpty, IsString } from "class-validator";

export class CreateInstituicaoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
  
  @IsString()
  @IsNotEmpty()
  telefone: string;
  
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  endereco: string;
}
