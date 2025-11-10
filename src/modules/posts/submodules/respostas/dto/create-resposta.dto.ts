import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRespostaDto {
  @IsString()
  @IsNotEmpty()
  conteudo: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsString()
  @IsOptional()
  respostaId?: string;
}
