import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateModeradorDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  setor: string;
}
