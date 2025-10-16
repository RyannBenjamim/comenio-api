import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe, Request } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '@prisma/client';
import { ValidateUUIDPipe } from '../../common/pipes/ValideUUIDPipe';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { sanitizeUser } from '../../common/utils/sanitizeUser';
import type { ApiResponse } from '../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from '../../common/interfaces/AuthenticatedRequest';

@Controller()
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createUsuarioDto: CreateUsuarioDto
  ): Promise<ApiResponse<Omit<Usuario, 'senha'>>> {
    const response = await this.usuariosService.create(createUsuarioDto);
    return {
      message: 'Usuário(a) criado(a) com sucesso.',
      data: sanitizeUser(response)
    }
  }

  @Get()
  async findAll(): Promise<ApiResponse<Omit<Usuario, 'senha'>[]>> {
    const response = await this.usuariosService.findAll();
    return {
      message: 'Usuários listados com sucesso.',
      data: response.map(sanitizeUser)
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Omit<Usuario, 'senha'>>> {
    const response = await this.usuariosService.findOne(id);
    return {
      message: 'Usuário(a) buscado(a) com sucesso.',
      data: sanitizeUser(response)
    }
  }

  @Patch('me') 
  async update(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) updateUsuarioDto: UpdateUsuarioDto
  ): Promise<ApiResponse<Omit<Usuario, 'senha'>>> {
    const response = await this.usuariosService.update(req.user.id, updateUsuarioDto);
    return {
      message: 'Usuário(a) atualizado(a) com sucesso.',
      data: sanitizeUser(response)
    }
  }

  @Delete('me')
  async delete(
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<Omit<Usuario, 'senha'>>> {
    const response = await this.usuariosService.remove(req.user.id);
    return {
      message: `Usuário(a) ${response.primeiroNome} ${response.sobrenome} deletado(a) com sucesso.`,
      data: sanitizeUser(response)
    }
  }
}
