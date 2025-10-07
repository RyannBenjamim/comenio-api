import { PartialType } from '@nestjs/mapped-types';
import { CreateResponsavelDto } from './create-responsavel.dto';

export class UpdateAlunoDto extends PartialType(CreateResponsavelDto) {}