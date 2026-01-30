import { PartialType } from '@nestjs/mapped-types';
import { CreateResolucaoDto } from './create-resolucao.dto';

export class UpdateResolucaoDto extends PartialType(CreateResolucaoDto) {}