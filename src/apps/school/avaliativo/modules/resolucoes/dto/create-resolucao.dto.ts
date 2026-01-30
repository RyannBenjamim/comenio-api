import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateResolucaoDto {
  @IsUUID()
  @IsNotEmpty()
  atividadeId: string;

  @IsString()
  @IsNotEmpty()
  conteudo: string;
}