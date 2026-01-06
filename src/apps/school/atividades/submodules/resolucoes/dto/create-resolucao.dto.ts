import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateResolucaoDto {
  @IsUUID()
  @IsNotEmpty()
  alunoId: string;

  @IsUUID()
  @IsNotEmpty()
  atividadeId: string;

  @IsString()
  @IsNotEmpty()
  conteudo: string;

  @IsString()
  @IsOptional()
  pdfCaminho?: string;
}
