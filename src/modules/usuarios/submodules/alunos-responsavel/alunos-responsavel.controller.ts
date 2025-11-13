import { Body, Controller, Get, Post, Query, ValidationPipe } from "@nestjs/common";
import { RelacaoDto } from './dto/relacao.dto';
import { ApiResponse } from 'src/common/interfaces/ApiResponse';
import { AlunosResponsavel } from '@prisma/client';
import { AlunosResponsavelService } from './alunos-responsavel.service';
import { ValidateUUIDPipe } from "src/common/pipes/ValideUUIDPipe";

@Controller()
export class AlunosResponsavelController {
  constructor(private readonly alunosResponsavelService: AlunosResponsavelService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) relacaoDto: RelacaoDto
  ): Promise<ApiResponse<AlunosResponsavel>> {
    const response = await this.alunosResponsavelService.create(relacaoDto);
    return {
      message: 'Relação entre aluno e responsável criada com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(
    @Query('responsavelId', ValidateUUIDPipe) responsavelId?: string,
    @Query('alunoId', ValidateUUIDPipe) alunoId?: string,
  ): Promise<ApiResponse<AlunosResponsavel[]>> {
    const response = await this.alunosResponsavelService.findAll(responsavelId, alunoId);
    return {
      message: 'Relações listadas com sucesso.',
      data: response
    };
  }
  
  @Post('find')
  async findOne(
    @Body(new ValidationPipe()) relacaoDto: RelacaoDto
  ): Promise<ApiResponse<AlunosResponsavel>> {
    const response = await this.alunosResponsavelService.findOne(relacaoDto);
    return {
      message: 'Relação entre aluno e responsável buscada com sucesso.',
      data: response
    };
  }
  
  @Post('remove')
  async remove(
    @Body(new ValidationPipe()) relacaoDto: RelacaoDto
  ): Promise<ApiResponse<AlunosResponsavel>> {
    const response = await this.alunosResponsavelService.remove(relacaoDto);
    return {
      message: `Relação entre aluno e responsável deletada com sucesso.`,
      data: response
    };
  }
}