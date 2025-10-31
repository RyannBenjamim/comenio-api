import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { MateriaTipo } from "@prisma/client";

export class CreateMateriaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;
  
  @IsEnum(MateriaTipo)
  @IsNotEmpty()
  tipo: MateriaTipo;

  @IsString()
  @IsNotEmpty()
  professorId: string;
}