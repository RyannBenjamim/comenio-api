import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe, Request } from '@nestjs/common';
import { ComunidadesService } from './comunidades.service';
import { Comunidade } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../common/pipes/ValideUUIDPipe';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';
import type { ApiResponse } from '../../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from '../../../common/interfaces/AuthenticatedRequest';

@Controller('api/comunidades')
export class ComunidadesController {
  constructor(private readonly comunidadesService: ComunidadesService) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createDto: CreateComunidadeDto
  ): Promise<ApiResponse<Comunidade>> {
    const response = await this.comunidadesService.create(createDto, req.user.instituicaoId);
    return {
      message: 'Comunidade criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<Comunidade[]>> {
    const response = await this.comunidadesService.findAll(req.user.instituicaoId);
    return {
      message: 'Comunidades listadas com sucesso.',
      data: response
    };
  }

  @Get('aluno')
  async getStudentCommunities(
    @Request() req: AuthenticatedRequest
  ) {
    const data = await this.comunidadesService.getStudentCommunities(req.user.id, req.user.instituicaoId);
    return { message: 'Comunidades como aluno listadas com sucesso.', data };
  }

  @Get('professor')
  async getTeacherCommunities(
    @Request() req: AuthenticatedRequest
  ) {
    const data = await this.comunidadesService.getTeacherCommunities(req.user.id, req.user.instituicaoId);
    return { message: 'Comunidades como professor listadas com sucesso.', data };
  }

  @Get(':id')
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Comunidade>> {
    const response = await this.comunidadesService.findOne(id, req.user.instituicaoId);
    return {
      message: 'Comunidade buscada com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateDto: UpdateComunidadeDto
  ): Promise<ApiResponse<Comunidade>> {
    const response = await this.comunidadesService.update(id, updateDto, req.user.instituicaoId);
    return {
      message: 'Comunidade atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Comunidade>> {
    const response = await this.comunidadesService.remove(id, req.user.instituicaoId);
    return {
      message: `Comunidade ${response.titulo} deletada com sucesso.`,
      data: response
    };
  }
}
