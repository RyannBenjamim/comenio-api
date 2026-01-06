import { Body, Controller, Patch, Post, ValidationPipe, Param, Request } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import type { ApiResponse } from '../../../../../common/interfaces/ApiResponse';
import { Aluno, Cargo } from '@prisma/client';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { ValidateUUIDPipe } from 'src/common/pipes/ValideUUIDPipe';
import type { AuthenticatedRequest } from '../../../../../common/interfaces/AuthenticatedRequest';
import { AuthRoles } from '../../../../../auth/decorators/auth-roles.decorator';

@Controller()
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  @AuthRoles(Cargo.ADMIN, Cargo.MODERADOR)
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createAlunoDto: CreateAlunoDto
  ): Promise<ApiResponse<Aluno>> {
    const response = await this.alunosService.create(createAlunoDto, req.user.instituicaoId);
    return {
      message: 'Aluno(a) criado(a) com sucesso.',
      data: response
    }
  }

  @Patch(':id') 
  @AuthRoles(Cargo.ADMIN, Cargo.MODERADOR)
  async update(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateAlunoDto: UpdateAlunoDto
  ): Promise<ApiResponse<Aluno>> {
    const response = await this.alunosService.update(id, updateAlunoDto);
    return {
      message: 'Aluno(a) atualizado(a) com sucesso.',
      data: response
    }
  }
}