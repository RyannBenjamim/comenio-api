import { StatusContrato } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateProfessorDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  matricula?: string;

  @IsEnum(StatusContrato)
  @IsNotEmpty()
  statusContrato: StatusContrato

  @IsNumber()
  @IsNotEmpty()
  cargaHoraria: number
}