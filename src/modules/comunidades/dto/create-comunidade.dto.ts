import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateComunidadeDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsOptional()
  fotoCaminho?: string;

  @IsString()
  @IsNotEmpty()
  aulaId: string;
}
