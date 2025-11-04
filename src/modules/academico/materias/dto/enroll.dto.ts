import { IsNotEmpty, IsString } from "class-validator";

export class EnrollDto {
  @IsString()
  @IsNotEmpty()
  alunoId: string;

  @IsString()
  @IsNotEmpty()
  materiaId: string;
}