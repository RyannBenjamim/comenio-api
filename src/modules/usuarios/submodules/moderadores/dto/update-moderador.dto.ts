import { PartialType } from '@nestjs/mapped-types';
import { CreateModeradorDto } from './create-moderador.dto';

export class UpdateModeradorDto extends PartialType(CreateModeradorDto) {}