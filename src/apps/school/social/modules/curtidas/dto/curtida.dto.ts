import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CurtidaDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsOptional()
  postId?: string;

  @IsUUID()
  @IsOptional()
  respostaId?: string;

  @IsUUID()
  @IsOptional()
  feedId?: string;
  
  @IsUUID()
  @IsOptional()
  comunidadeId?: string;
}