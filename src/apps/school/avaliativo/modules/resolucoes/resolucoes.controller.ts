import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe, Request, UseGuards } from '@nestjs/common';
import { ResolucoesService } from './resolucoes.service';
import { Resolucao } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../../../common/pipes/ValideUUIDPipe';
import { CreateResolucaoDto } from './dto/create-resolucao.dto';
import { UpdateResolucaoDto } from './dto/update-resolucao.dto';
import type { ApiResponse } from '../../../../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from '../../../../../common/interfaces/AuthenticatedRequest';
import { ContextAccessGuard } from '../../../../../common/guards/context-access.guard';
import { AvaliativoContextResolverGuard } from '../../guards/avaliativo-context-resolver.guard';

@Controller('api/resolucoes')
export class ResolucoesController {
  constructor(private readonly resolucoesService: ResolucoesService) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createDto: CreateResolucaoDto
  ): Promise<ApiResponse<Resolucao>> {
    const user = req.user;
    const { id, instituicaoId } = req.user;
    const response = await this.resolucoesService.create(createDto, id, instituicaoId, user);
    return {
      message: 'Resolução criada com sucesso.',
      data: response
    };
  }

  @Get()
  @UseGuards(AvaliativoContextResolverGuard, ContextAccessGuard)
  async findAll(
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<Resolucao[]>> {
    const response = await this.resolucoesService.findAll(req.user.instituicaoId);
    return {
      message: 'Resoluções listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  @UseGuards(AvaliativoContextResolverGuard, ContextAccessGuard)
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Resolucao>> {
    const response = await this.resolucoesService.findOne(id, req.user.instituicaoId);
    return {
      message: 'Resolução buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  @UseGuards(AvaliativoContextResolverGuard, ContextAccessGuard)
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateDto: UpdateResolucaoDto
  ): Promise<ApiResponse<Resolucao>> {
    const response = await this.resolucoesService.update(id, updateDto, req.user.instituicaoId);
    return {
      message: 'Resolução atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  @UseGuards(AvaliativoContextResolverGuard, ContextAccessGuard)
  async remove(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Resolucao>> {
    const response = await this.resolucoesService.remove(id, req.user.instituicaoId);
    return {
      message: `Resolução deletada com sucesso.`,
      data: response
    };
  }
}