import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddResponsavelDto {
  @IsUUID()
  @IsNotEmpty()
  alunoId: string;

  @IsUUID()
  @IsNotEmpty()
  responsavelId: string;
}