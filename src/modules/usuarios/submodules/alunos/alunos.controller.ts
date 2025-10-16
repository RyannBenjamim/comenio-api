import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import type { ApiResponse } from '../../../../common/interfaces/ApiResponse';
import { Aluno } from '@prisma/client';

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
}