import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { Body, Controller, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ResponsaveisService } from './responsaveis.service';
import type { ApiResponse } from '../../../../common/interfaces/ApiResponse';
import { ValidateUUIDPipe } from '../../../../common/pipes/ValideUUIDPipe';
import { Responsavel } from '@prisma/client';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';

@Controller()
export class ResponsaveisController {
  constructor(private readonly responsaveisService: ResponsaveisService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createResponsavelDto: CreateResponsavelDto
  ): Promise<ApiResponse<Responsavel>> {
    const response = await this.responsaveisService.create(createResponsavelDto);
    return {
      message: 'Responsável criado(a) com sucesso.',
      data: response
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateResponsavelDto: UpdateResponsavelDto
  ): Promise<ApiResponse<Responsavel>> {
    const response = await this.responsaveisService.update(id, updateResponsavelDto);
    return {
      message: 'Responsável atualizado(a) com sucesso.',
      data: response
    };
  }
}
