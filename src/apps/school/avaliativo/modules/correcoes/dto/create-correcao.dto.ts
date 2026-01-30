import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCorrecaoDto {
  @IsUUID()
  @IsNotEmpty()
  resolucaoId: string;

  @IsUUID()
  @IsNotEmpty()
  professorId: string;

  @IsString()
  @IsNotEmpty()
  conteudo: string;
}