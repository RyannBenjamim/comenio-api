import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { Aula } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../common/pipes/ValideUUIDPipe';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import type { ApiResponse } from '../../../common/interfaces/ApiResponse';

@Controller('aulas')
export class AulasController {
  constructor(private readonly aulasService: AulasService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createAulaDto: CreateAulaDto
  ): Promise<ApiResponse<Aula>> {
    const response = await this.aulasService.create(createAulaDto);
    return {
      message: 'Aula criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<Aula[]>> {
    const response = await this.aulasService.findAll();
    return {
      message: 'Aulas listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Aula>> {
    const response = await this.aulasService.findOne(id);
    return {
      message: 'Aula buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateAulaDto: UpdateAulaDto
  ): Promise<ApiResponse<Aula>> {
    const response = await this.aulasService.update(id, updateAulaDto);
    return {
      message: 'Aula atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Aula>> {
    const response = await this.aulasService.remove(id);
    return {
      message: 'Aula deletada com sucesso.',
      data: response
    };
  }
}
