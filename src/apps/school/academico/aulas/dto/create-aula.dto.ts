import { IsNotEmpty, IsString } from "class-validator";

export class CreateAulaDto {
  @IsString()
  @IsNotEmpty()
  professorId: string;

  @IsString()
  @IsNotEmpty()
  turmaId: string;

  @IsString()
  @IsNotEmpty()
  materiaId: string;

  @IsString()
  @IsNotEmpty()
  nomeComunidade: string;
}
