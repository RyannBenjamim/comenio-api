import { Body, Controller, Get, Post, Query, ValidationPipe, Request } from "@nestjs/common";
import { RelacaoDto } from './dto/relacao.dto';
import { ApiResponse } from 'src/common/interfaces/ApiResponse';
import { AlunosResponsavel, Cargo } from '@prisma/client';
import { AlunosResponsavelService } from './alunos-responsavel.service';
import { ValidateUUIDPipe } from "src/common/pipes/ValideUUIDPipe";
import type { AuthenticatedRequest } from '../../../../../common/interfaces/AuthenticatedRequest';
import { AuthRoles } from '../../../../../auth/decorators/auth-roles.decorator';

@Controller()
export class AlunosResponsavelController {
  constructor(private readonly alunosResponsavelService: AlunosResponsavelService) {}

  @Post()
  @AuthRoles(Cargo.ADMIN, Cargo.MODERADOR)
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) relacaoDto: RelacaoDto
  ): Promise<ApiResponse<AlunosResponsavel>> {
    const response = await this.alunosResponsavelService.create(relacaoDto, req.user.instituicaoId);
    return {
      message: 'Relação entre aluno e responsável criada com sucesso.',
      data: response
    };
  }

  @Get()
  @AuthRoles(Cargo.ADMIN, Cargo.MODERADOR)
  async findAll(
    @Request() req: AuthenticatedRequest,
    @Query('responsavelId', ValidateUUIDPipe) responsavelId?: string,
    @Query('alunoId', ValidateUUIDPipe) alunoId?: string,
  ): Promise<ApiResponse<AlunosResponsavel[]>> {
    const response = await this.alunosResponsavelService.findAll(req.user.instituicaoId, responsavelId, alunoId);
    return {
      message: 'Relações listadas com sucesso.',
      data: response
    };
  }
  
  @Post('find')
  @AuthRoles(Cargo.ADMIN, Cargo.MODERADOR)
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
  @AuthRoles(Cargo.ADMIN, Cargo.MODERADOR)
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