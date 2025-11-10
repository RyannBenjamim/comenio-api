import { Body, Controller, Delete, Get, Param, Patch, Post as PostMethod, Query, ValidationPipe } from '@nestjs/common';
import { RespostasService } from './respostas.service';
import { Resposta } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../../common/pipes/ValideUUIDPipe';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { UpdateRespostaDto } from './dto/update-resposta.dto';
import type { ApiResponse } from '../../../../common/interfaces/ApiResponse';

@Controller('respostas')
export class RespostasController {
  constructor(private readonly respostasService: RespostasService) {}

  @PostMethod()
  async create(
    @Body(new ValidationPipe()) createDto: CreateRespostaDto
  ): Promise<ApiResponse<Resposta>> {
    const response = await this.respostasService.create(createDto);
    return {
      message: 'Resposta criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(
    @Query('postId', ValidateUUIDPipe) postId?: string,
    @Query('respostaId', ValidateUUIDPipe) respostaId?: string,
  ): Promise<ApiResponse<Resposta[]>> {
    const response = await this.respostasService.findAll(postId, respostaId);
    return {
      message: 'Respostas listadas com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Resposta>> {
    const response = await this.respostasService.findOne(id);
    return {
      message: 'Resposta buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateDto: UpdateRespostaDto
  ): Promise<ApiResponse<Resposta>> {
    const response = await this.respostasService.update(id, updateDto);
    return {
      message: 'Resposta atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Resposta>> {
    const response = await this.respostasService.remove(id);
    return {
      message: `Resposta deletada com sucesso.`,
      data: response
    };
  }
}
