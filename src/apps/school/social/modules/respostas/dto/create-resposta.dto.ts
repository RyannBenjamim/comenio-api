import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRespostaDto {
  @IsString()
  @IsNotEmpty()
  conteudo: string;

  @IsString()
  @IsOptional()
  postId?: string;

  @IsString()
  @IsOptional()
  respostaId?: string;
}
