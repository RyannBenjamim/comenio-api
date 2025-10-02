import { PartialType } from '@nestjs/mapped-types';
import { CreateInstituicoeDto } from './create-instituicoe.dto';

export class UpdateInstituicoeDto extends PartialType(CreateInstituicoeDto) {}
