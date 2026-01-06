import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  conteudo: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  feedId?: string;

  @IsString()
  @IsOptional()
  comunidadeId?: string;
}

