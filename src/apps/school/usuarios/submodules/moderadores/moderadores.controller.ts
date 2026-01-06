import { CreateModeradorDto } from './dto/create-moderador.dto';
import { Body, Controller, Param, Patch, Post, ValidationPipe, Request } from '@nestjs/common';
import { ModeradoresService } from './moderadores.service';
import type { ApiResponse } from '../../../../../common/interfaces/ApiResponse';
import { Cargo, Moderador } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../../../common/pipes/ValideUUIDPipe';
import { UpdateModeradorDto } from './dto/update-moderador.dto';
import type { AuthenticatedRequest } from '../../../../../common/interfaces/AuthenticatedRequest';
import { AuthRoles } from '../../../../../auth/decorators/auth-roles.decorator';

@Controller()
export class ModeradoresController {
  constructor(private readonly moderadoresService: ModeradoresService) {}

  @Post()
  @AuthRoles(Cargo.ADMIN, Cargo.MODERADOR)
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createModeradorDto: CreateModeradorDto
  ): Promise<ApiResponse<Moderador>> {
    const response = await this.moderadoresService.create(createModeradorDto, req.user.instituicaoId);
    return {
      message: 'Moderador(a) criado(a) com sucesso.',
      data: response
    }
  }

  @Patch(':id') 
  @AuthRoles(Cargo.ADMIN, Cargo.MODERADOR)
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
