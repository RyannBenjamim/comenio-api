import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Periodo } from "@prisma/client";

export class CreateTurmaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;
  
  @IsEnum(Periodo)
  @IsNotEmpty()
  periodo: Periodo;
}