import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { Materia } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../common/pipes/ValideUUIDPipe';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import type { ApiResponse } from '../../../common/interfaces/ApiResponse';

@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createMateriaDto: CreateMateriaDto
  ): Promise<ApiResponse<Materia>> {
    const response = await this.materiasService.create(createMateriaDto);
    return {
      message: 'Matéria criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<Materia[]>> {
    const response = await this.materiasService.findAll();
    return {
      message: 'Matérias listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Materia>> {
    const response = await this.materiasService.findOne(id);
    return {
      message: 'Matéria buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateMateriaDto: UpdateMateriaDto
  ): Promise<ApiResponse<Materia>> {
    const response = await this.materiasService.update(id, updateMateriaDto);
    return {
      message: 'Matéria atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Materia>> {
    const response = await this.materiasService.remove(id);
    return {
      message: `Matéria ${response.titulo} deletada com sucesso.`,
      data: response
    };
  }
}
