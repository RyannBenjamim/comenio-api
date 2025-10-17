import { CreateModeradorDto } from './dto/create-moderador.dto';
import { Body, Controller, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ModeradoresService } from './moderadores.service';
import type { ApiResponse } from '../../../../common/interfaces/ApiResponse';
import { Moderador } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../../common/pipes/ValideUUIDPipe';
import { UpdateModeradorDto } from './dto/update-moderador.dto';

@Controller()
export class ModeradoresController {
  constructor(private readonly moderadoresService: ModeradoresService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createModeradorDto: CreateModeradorDto
  ): Promise<ApiResponse<Moderador>> {
    const response = await this.moderadoresService.create(createModeradorDto);
    return {
      message: 'Moderador(a) criado(a) com sucesso.',
      data: response
    }
  }

  @Patch(':id') 
  async update(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateModeradorDto: UpdateModeradorDto
  ): Promise<ApiResponse<Moderador>> {
    const response = await this.moderadoresService.update(id, updateModeradorDto);
    return {
      message: 'Moderador(a) atualizado(a) com sucesso.',
      data: response
    }
  }
}
