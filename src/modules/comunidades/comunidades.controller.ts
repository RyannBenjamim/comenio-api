import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ComunidadesService } from './comunidades.service';
import { Comunidade } from '@prisma/client';
import { ValidateUUIDPipe } from '../../common/pipes/ValideUUIDPipe';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';
import type { ApiResponse } from '../../common/interfaces/ApiResponse';

@Controller('comunidades')
export class ComunidadesController {
  constructor(private readonly comunidadesService: ComunidadesService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createDto: CreateComunidadeDto
  ): Promise<ApiResponse<Comunidade>> {
    const response = await this.comunidadesService.create(createDto);
    return {
      message: 'Comunidade criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<Comunidade[]>> {
    const response = await this.comunidadesService.findAll();
    return {
      message: 'Comunidades listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Comunidade>> {
    const response = await this.comunidadesService.findOne(id);
    return {
      message: 'Comunidade buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateDto: UpdateComunidadeDto
  ): Promise<ApiResponse<Comunidade>> {
    const response = await this.comunidadesService.update(id, updateDto);
    return {
      message: 'Comunidade atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Comunidade>> {
    const response = await this.comunidadesService.remove(id);
    return {
      message: `Comunidade ${response.titulo} deletada com sucesso.`,
      data: response
    };
  }
}
