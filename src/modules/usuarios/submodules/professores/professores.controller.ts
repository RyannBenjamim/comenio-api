import { CreateProfessorDto } from './dto/create-professor.dto';
import { Body, Controller, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import type { ApiResponse } from '../../../../common/interfaces/ApiResponse';
import { ValidateUUIDPipe } from '../../../../common/pipes/ValideUUIDPipe';
import { Professor } from '@prisma/client';
import { UpdateProfessorDto } from './dto/update-professor.dto';

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

  @Patch(':id')
  async update(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateProfessorDto: UpdateProfessorDto
  ): Promise<ApiResponse<Professor>> {
    const response = await this.professoresService.update(id, updateProfessorDto);
    return {
      message: 'Professor(a) atualizado(a) com sucesso.',
      data: response
    };
  }
}