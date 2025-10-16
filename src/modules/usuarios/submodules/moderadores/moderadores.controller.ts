import { CreateModeradorDto } from './dto/create-moderador.dto';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ModeradoresService } from './moderadores.service';
import type { ApiResponse } from '../../../../common/interfaces/ApiResponse';
import { Moderador } from '@prisma/client';

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
}
