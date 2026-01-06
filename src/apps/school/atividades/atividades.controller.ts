import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe, Request } from '@nestjs/common';
import { AtividadesService } from './atividades.service';
import { Atividade } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../common/pipes/ValideUUIDPipe';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';
import type { ApiResponse } from '../../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from '../../../common/interfaces/AuthenticatedRequest';

@Controller()
export class AtividadesController {
  constructor(private readonly atividadesService: AtividadesService) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createDto: CreateAtividadeDto
  ): Promise<ApiResponse<Atividade>> {
    const response = await this.atividadesService.create(createDto, req.user.instituicaoId);
    return {
      message: 'Atividade criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<Atividade[]>> {
    const response = await this.atividadesService.findAll(req.user.instituicaoId);
    return {
      message: 'Atividades listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Atividade>> {
    const response = await this.atividadesService.findOne(id, req.user.instituicaoId);
    return {
      message: 'Atividade buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateDto: UpdateAtividadeDto
  ): Promise<ApiResponse<Atividade>> {
    const response = await this.atividadesService.update(id, updateDto, req.user.instituicaoId);
    return {
      message: 'Atividade atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Atividade>> {
    const response = await this.atividadesService.remove(id, req.user.instituicaoId);
    return {
      message: `Atividade ${response.titulo} deletada com sucesso.`,
      data: response
    };
  }
}
