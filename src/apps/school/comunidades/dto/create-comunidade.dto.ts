import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateComunidadeDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  aulaId: string;
}
