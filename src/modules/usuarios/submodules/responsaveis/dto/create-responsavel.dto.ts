import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateResponsavelDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  grauParentesco: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: 'CPF deve ter 11 dígitos' })
  cpf: string;
}
