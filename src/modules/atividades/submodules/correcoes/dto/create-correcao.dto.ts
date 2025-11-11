import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

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

  @IsString()
  @IsOptional()
  pdfCaminho?: string;
}
