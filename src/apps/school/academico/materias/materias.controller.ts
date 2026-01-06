import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe, Request } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { Materia } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../../common/pipes/ValideUUIDPipe';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import type { ApiResponse } from '../../../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from '../../../../common/interfaces/AuthenticatedRequest';

@Controller('api/materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createMateriaDto: CreateMateriaDto
  ): Promise<ApiResponse<Materia>> {
    const response = await this.materiasService.create(createMateriaDto, req.user.instituicaoId);
    return {
      message: 'Matéria criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(
    @Request() req: AuthenticatedRequest
  ): Promise<ApiResponse<Materia[]>> {
    const response = await this.materiasService.findAll(req.user.instituicaoId);
    return {
      message: 'Matérias listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Materia>> {
    const response = await this.materiasService.findOne(id, req.user.instituicaoId);
    return {
      message: 'Matéria buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateMateriaDto: UpdateMateriaDto
  ): Promise<ApiResponse<Materia>> {
    const response = await this.materiasService.update(id, updateMateriaDto, req.user.instituicaoId);
    return {
      message: 'Matéria atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Materia>> {
    const response = await this.materiasService.remove(id, req.user.instituicaoId);
    return {
      message: `Matéria ${response.titulo} deletada com sucesso.`,
      data: response
    };
  }
}
