import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe, Request } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { Aula } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../../common/pipes/ValideUUIDPipe';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import type { ApiResponse } from '../../../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from '../../../../common/interfaces/AuthenticatedRequest';

@Controller('api/aulas')
export class AulasController {
  constructor(private readonly aulasService: AulasService) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createAulaDto: CreateAulaDto
  ): Promise<ApiResponse<Aula>> {
    const response = await this.aulasService.create(createAulaDto, req.user.instituicaoId);
    return {
      message: 'Aula criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<Aula[]>> {
    const response = await this.aulasService.findAll(req.user.instituicaoId);
    return {
      message: 'Aulas listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Aula>> {
    const response = await this.aulasService.findOne(id, req.user.instituicaoId);
    return {
      message: 'Aula buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateAulaDto: UpdateAulaDto
  ): Promise<ApiResponse<Aula>> {
    const response = await this.aulasService.update(id, updateAulaDto, req.user.instituicaoId);
    return {
      message: 'Aula atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Aula>> {
    const response = await this.aulasService.remove(id, req.user.instituicaoId);
    return {
      message: 'Aula deletada com sucesso.',
      data: response
    };
  }
}
