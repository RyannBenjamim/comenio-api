import { PartialType } from '@nestjs/mapped-types';
import { CreateModeradorDto } from './create-moderador.dto';

export class UpdateAlunoDto extends PartialType(CreateModeradorDto) {}