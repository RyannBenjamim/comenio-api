import { Body, Controller, Delete, Get, Param, Patch, Post as PostMethod, Query, ValidationPipe, Request, UseGuards } from '@nestjs/common';
import { RespostasService } from './respostas.service';
import { Resposta } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../../../common/pipes/ValideUUIDPipe';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { UpdateRespostaDto } from './dto/update-resposta.dto';
import type { ApiResponse } from '../../../../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from "../../../../../common/interfaces/AuthenticatedRequest";
import { ContextResolverGuard } from '../../guards/context-resolver.guard';
import { ContextAccessGuard } from '../../guards/context-access.guard';

@Controller()
export class RespostasController {
  constructor(private readonly respostasService: RespostasService) {}

  @PostMethod()
  @UseGuards(ContextResolverGuard, ContextAccessGuard)
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createDto: CreateRespostaDto
  ): Promise<ApiResponse<Resposta>> {
    const context = { 
      comunidadeId: req.context?.comunidadeId,
      feedId: req.context?.feedId
    }

    const response = await this.respostasService.create(
      createDto,
      context,
      req.user.instituicaoId
    );

    return {
      message: 'Resposta criada com sucesso.',
      data: response
    };
  }

  @Get()
  @UseGuards(ContextResolverGuard, ContextAccessGuard)
  async findAll(
    @Request() req: AuthenticatedRequest,
    @Query('postId', ValidateUUIDPipe) postId?: string,
    @Query('respostaId', ValidateUUIDPipe) respostaId?: string,
  ): Promise<ApiResponse<Resposta[]>> {
    const response = await this.respostasService.findAll(req.user.instituicaoId, postId, respostaId);
    return {
      message: 'Respostas listadas com sucesso.',
      data: response
    };
  }

  @Get(':respostaId')
  @UseGuards(ContextResolverGuard, ContextAccessGuard)
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('respostaId', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Resposta>> {
    const response = await this.respostasService.findOne(id, req.user.instituicaoId);
    return {
      message: 'Resposta buscada com sucesso.',
      data: response
    };
  }

  @Patch(':respostaId')
  @UseGuards(ContextResolverGuard, ContextAccessGuard)
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('respostaId', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateDto: UpdateRespostaDto
  ): Promise<ApiResponse<Resposta>> {
    const response = await this.respostasService.update(id, updateDto, req.user.instituicaoId);
    return {
      message: 'Resposta atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':respostaId')
  @UseGuards(ContextResolverGuard, ContextAccessGuard)
  async remove(
    @Request() req: AuthenticatedRequest,
    @Param('respostaId', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Resposta>> {
    const response = await this.respostasService.remove(id, req.user.instituicaoId);
    return {
      message: `Resposta deletada com sucesso.`,
      data: response
    };
  }
}
