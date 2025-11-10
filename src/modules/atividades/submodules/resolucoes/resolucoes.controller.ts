import { Body, Controller, Delete, Get, Param, Patch, Post as PostMethod, ValidationPipe } from '@nestjs/common';
import { ResolucoesService } from './resolucoes.service';
import { Resolucao } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../../common/pipes/ValideUUIDPipe';
import { CreateResolucaoDto } from './dto/create-resolucao.dto';
import { UpdateResolucaoDto } from './dto/update-resolucao.dto';
import type { ApiResponse } from '../../../../common/interfaces/ApiResponse';

@Controller('resolucoes')
export class ResolucoesController {
  constructor(private readonly resolucoesService: ResolucoesService) {}

  @PostMethod()
  async create(
    @Body(new ValidationPipe()) createDto: CreateResolucaoDto
  ): Promise<ApiResponse<Resolucao>> {
    const response = await this.resolucoesService.create(createDto);
    return {
      message: 'Resolução criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<Resolucao[]>> {
    const response = await this.resolucoesService.findAll();
    return {
      message: 'Resoluções listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Resolucao>> {
    const response = await this.resolucoesService.findOne(id);
    return {
      message: 'Resolução buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateDto: UpdateResolucaoDto
  ): Promise<ApiResponse<Resolucao>> {
    const response = await this.resolucoesService.update(id, updateDto);
    return {
      message: 'Resolução atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Resolucao>> {
    const response = await this.resolucoesService.remove(id);
    return {
      message: `Resolução deletada com sucesso.`,
      data: response
    };
  }
}
