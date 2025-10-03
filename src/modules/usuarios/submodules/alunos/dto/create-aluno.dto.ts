import { IsString, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAlunoDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  matricula?: string;

  @IsUUID()
  @IsNotEmpty()
  turmaId: string;

  @IsString()
  @IsNotEmpty()
  statusMatricula: string;
}
