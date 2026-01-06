import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe, Request } from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { Turma } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../../common/pipes/ValideUUIDPipe';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import type { ApiResponse } from '../../../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from '../../../../common/interfaces/AuthenticatedRequest';

@Controller('api/turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createTurmaDto: CreateTurmaDto
  ): Promise<ApiResponse<Turma>> {
    const response = await this.turmasService.create(createTurmaDto, req.user.instituicaoId);
    return {
      message: 'Turma criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<Turma[]>> {
    const response = await this.turmasService.findAll(req.user.instituicaoId);
    return {
      message: 'Turmas listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Turma>> {
    const response = await this.turmasService.findOne(id, req.user.instituicaoId);
    return {
      message: 'Turma buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateTurmaDto: UpdateTurmaDto
  ): Promise<ApiResponse<Turma>> {
    const response = await this.turmasService.update(id, req.user.instituicaoId, updateTurmaDto);
    return {
      message: 'Turma atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Turma>> {
    const response = await this.turmasService.remove(id, req.user.instituicaoId);
    return {
      message: `Turma ${response.titulo} deletada com sucesso.`,
      data: response
    };
  }
}
