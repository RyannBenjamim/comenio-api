import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe, Request } from '@nestjs/common';
import { CorrecoesService } from './correcoes.service';
import { Correcao } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../../../common/pipes/ValideUUIDPipe';
import { CreateCorrecaoDto } from './dto/create-correcao.dto';
import { UpdateCorrecaoDto } from './dto/update-correcao.dto';
import type { ApiResponse } from '../../../../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from '../../../../../common/interfaces/AuthenticatedRequest';

@Controller()
export class CorrecoesController {
  constructor(private readonly correcoesService: CorrecoesService) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createDto: CreateCorrecaoDto
  ): Promise<ApiResponse<Correcao>> {
    const response = await this.correcoesService.create(createDto, req.user.instituicaoId);
    return {
      message: 'Correção criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<Correcao[]>> {
    const response = await this.correcoesService.findAll(req.user.instituicaoId);
    return {
      message: 'Correções listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Correcao>> {
    const response = await this.correcoesService.findOne(id, req.user.instituicaoId);
    return {
      message: 'Correção buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateDto: UpdateCorrecaoDto
  ): Promise<ApiResponse<Correcao>> {
    const response = await this.correcoesService.update(id, updateDto, req.user.instituicaoId);
    return {
      message: 'Correção atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Correcao>> {
    const response = await this.correcoesService.remove(id, req.user.instituicaoId);
    return {
      message: `Correção deletada com sucesso.`,
      data: response
    };
  }
}
