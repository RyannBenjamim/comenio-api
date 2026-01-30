import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe, Request, Query, UseGuards } from '@nestjs/common';
import { AtividadesService } from './atividades.service';
import { Atividade } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../../../common/pipes/ValideUUIDPipe';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';
import type { ApiResponse } from '../../../../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from '../../../../../common/interfaces/AuthenticatedRequest';
import { ContextAccessGuard } from '../../../../../common/guards/context-access.guard';
import { AvaliativoContextResolverGuard } from '../../guards/avaliativo-context-resolver.guard';

@Controller('api/atividades')
export class AtividadesController {
  constructor(private readonly atividadesService: AtividadesService) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createDto: CreateAtividadeDto
  ): Promise<ApiResponse<Atividade>> {
    const { id, instituicaoId } = req.user;
    const response = await this.atividadesService.create(createDto, id, instituicaoId);
    return {
      message: 'Atividade criada com sucesso.',
      data: response
    };
  }

  @Get()
  @UseGuards(AvaliativoContextResolverGuard, ContextAccessGuard)
  async findAll(
    @Request() req: AuthenticatedRequest,
    @Query('comunidadeId', ValidateUUIDPipe) comunidadeId: string,
  ): Promise<ApiResponse<Atividade[]>> {
    const response = await this.atividadesService.findAll(req.user.instituicaoId, comunidadeId);
    return {
      message: 'Atividades listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  @UseGuards(AvaliativoContextResolverGuard, ContextAccessGuard)
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
  @UseGuards(AvaliativoContextResolverGuard, ContextAccessGuard)
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
  @UseGuards(AvaliativoContextResolverGuard, ContextAccessGuard)
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
