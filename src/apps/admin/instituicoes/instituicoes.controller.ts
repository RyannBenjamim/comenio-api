import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { InstituicoesService } from './instituicoes.service';
import { Instituicao } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../common/pipes/ValideUUIDPipe';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';
import type { ApiResponse } from '../../../common/interfaces/ApiResponse';

@Controller('admin/instituicoes')
export class InstituicoesController {
  constructor(private readonly instituicoesService: InstituicoesService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createInstituicaoDto: CreateInstituicaoDto
  ): Promise<ApiResponse<Instituicao>> {
    const response = await this.instituicoesService.create(createInstituicaoDto);
    return {
      message: 'Instituição criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<Instituicao[]>> {
    const response = await this.instituicoesService.findAll();
    return {
      message: 'Instituições listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Instituicao>> {
    const response = await this.instituicoesService.findOne(id);
    return {
      message: 'Instituição buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateInstituicaoDto: UpdateInstituicaoDto
  ): Promise<ApiResponse<Instituicao>> {
    const response = await this.instituicoesService.update(id, updateInstituicaoDto);
    return {
      message: 'Instituição atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Instituicao>> {
    const response = await this.instituicoesService.remove(id);
    return {
      message: `Instituição ${response.nome} deletada com sucesso.`,
      data: response
    };
  }
}
