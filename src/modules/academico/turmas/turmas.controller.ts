import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { Turma } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../common/pipes/ValideUUIDPipe';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import type { ApiResponse } from '../../../common/interfaces/ApiResponse';

@Controller('turmas')
export class TurmasController {
  constructor(private readonly turmasService: TurmasService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createTurmaDto: CreateTurmaDto
  ): Promise<ApiResponse<Turma>> {
    const response = await this.turmasService.create(createTurmaDto);
    return {
      message: 'Turma criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<Turma[]>> {
    const response = await this.turmasService.findAll();
    return {
      message: 'Turmas listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Turma>> {
    const response = await this.turmasService.findOne(id);
    return {
      message: 'Turma buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateTurmaDto: UpdateTurmaDto
  ): Promise<ApiResponse<Turma>> {
    const response = await this.turmasService.update(id, updateTurmaDto);
    return {
      message: 'Turma atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Turma>> {
    const response = await this.turmasService.remove(id);
    return {
      message: `Turma ${response.titulo} deletada com sucesso.`,
      data: response
    };
  }
}
