import { Body, Controller, Delete, Get, Param, Patch, Post as PostMethod, ValidationPipe } from '@nestjs/common';
import { AtividadesService } from './atividades.service';
import { Atividade } from '@prisma/client';
import { ValidateUUIDPipe } from '../../common/pipes/ValideUUIDPipe';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';
import type { ApiResponse } from '../../common/interfaces/ApiResponse';

@Controller()
export class AtividadesController {
  constructor(private readonly atividadesService: AtividadesService) {}

  @PostMethod()
  async create(
    @Body(new ValidationPipe()) createDto: CreateAtividadeDto
  ): Promise<ApiResponse<Atividade>> {
    const response = await this.atividadesService.create(createDto);
    return {
      message: 'Atividade criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<Atividade[]>> {
    const response = await this.atividadesService.findAll();
    return {
      message: 'Atividades listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Atividade>> {
    const response = await this.atividadesService.findOne(id);
    return {
      message: 'Atividade buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateDto: UpdateAtividadeDto
  ): Promise<ApiResponse<Atividade>> {
    const response = await this.atividadesService.update(id, updateDto);
    return {
      message: 'Atividade atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Atividade>> {
    const response = await this.atividadesService.remove(id);
    return {
      message: `Atividade ${response.titulo} deletada com sucesso.`,
      data: response
    };
  }
}
