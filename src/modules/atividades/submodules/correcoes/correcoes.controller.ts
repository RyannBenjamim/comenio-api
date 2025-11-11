import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CorrecoesService } from './correcoes.service';
import { Correcao } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../../common/pipes/ValideUUIDPipe';
import { CreateCorrecaoDto } from './dto/create-correcao.dto';
import { UpdateCorrecaoDto } from './dto/update-correcao.dto';
import type { ApiResponse } from '../../../../common/interfaces/ApiResponse';

@Controller()
export class CorrecoesController {
  constructor(private readonly correcoesService: CorrecoesService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createDto: CreateCorrecaoDto
  ): Promise<ApiResponse<Correcao>> {
    const response = await this.correcoesService.create(createDto);
    return {
      message: 'Correção criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<Correcao[]>> {
    const response = await this.correcoesService.findAll();
    return {
      message: 'Correções listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Correcao>> {
    const response = await this.correcoesService.findOne(id);
    return {
      message: 'Correção buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateDto: UpdateCorrecaoDto
  ): Promise<ApiResponse<Correcao>> {
    const response = await this.correcoesService.update(id, updateDto);
    return {
      message: 'Correção atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Correcao>> {
    const response = await this.correcoesService.remove(id);
    return {
      message: `Correção deletada com sucesso.`,
      data: response
    };
  }
}
