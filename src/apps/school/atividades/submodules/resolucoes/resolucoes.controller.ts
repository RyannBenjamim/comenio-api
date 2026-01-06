import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe, Request } from '@nestjs/common';
import { ResolucoesService } from './resolucoes.service';
import { Resolucao } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../../../common/pipes/ValideUUIDPipe';
import { CreateResolucaoDto } from './dto/create-resolucao.dto';
import { UpdateResolucaoDto } from './dto/update-resolucao.dto';
import type { ApiResponse } from '../../../../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from '../../../../../common/interfaces/AuthenticatedRequest';

@Controller()
export class ResolucoesController {
  constructor(private readonly resolucoesService: ResolucoesService) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createDto: CreateResolucaoDto
  ): Promise<ApiResponse<Resolucao>> {
    const response = await this.resolucoesService.create(createDto, req.user.instituicaoId);
    return {
      message: 'Resolução criada com sucesso.',
      data: response
    };
  }

  @Get()
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
