import { IsNotEmpty, IsString, IsDateString, IsUUID } from "class-validator";

export class CreateAtividadeDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  conteudo: string;

  @IsDateString()
  @IsNotEmpty()
  dataInicio: Date;

  @IsDateString()
  @IsNotEmpty()
  dataFim: Date;

  @IsUUID()
  @IsNotEmpty()
  comunidadeId: string;
}
