import { CreateProfessorDto } from './dto/create-professor.dto';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import type { ApiResponse } from '../../../../common/interfaces/ApiResponse';
import { Professor } from '@prisma/client';

@Controller()
export class ProfessoresController {
  constructor(private readonly professoresService: ProfessoresService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createProfessorDto: CreateProfessorDto
  ): Promise<ApiResponse<Professor>> {
    const response = await this.professoresService.create(createProfessorDto);
    return {
      message: 'Professor(a) criado(a) com sucesso.',
      data: response
    }
  }
}