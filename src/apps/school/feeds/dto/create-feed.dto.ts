import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Cargo } from "@prisma/client";

export class CreateFeedDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsEnum(Cargo)
  @IsNotEmpty()
  tipoPerfil: Cargo;
}

