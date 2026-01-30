import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  conteudo: string;

  @IsString()
  @IsOptional()
  feedId?: string;

  @IsString()
  @IsOptional()
  comunidadeId?: string;
}

