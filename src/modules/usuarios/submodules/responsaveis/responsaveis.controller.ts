import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ResponsaveisService } from './responsaveis.service';
import type { ApiResponse } from '../../../../common/interfaces/ApiResponse';
import { Responsavel } from '@prisma/client';

@Controller('responsaveis')
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
}
