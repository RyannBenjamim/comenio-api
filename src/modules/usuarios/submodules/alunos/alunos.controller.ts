import { Body, Controller, Patch, Post, ValidationPipe, Request } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import type { ApiResponse } from '../../../../common/interfaces/ApiResponse';
import { Aluno } from '@prisma/client';
import type { AuthenticatedRequest } from '../../../../common/interfaces/AuthenticatedRequest'
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Controller()
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createAlunoDto: CreateAlunoDto
  ): Promise<ApiResponse<Aluno>> {
    const response = await this.alunosService.create(createAlunoDto);
    return {
      message: 'Aluno(a) criado(a) com sucesso.',
      data: response
    }
  }

  @Patch('me') 
  async update(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) updateAlunoDto: UpdateAlunoDto
  ): Promise<ApiResponse<Aluno>> {
    const response = await this.alunosService.update(req.user.id, updateAlunoDto);
    return {
      message: 'Aluno(a) atualizado(a) com sucesso.',
      data: response
    }
  }
}