import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Patch, 
  Post, 
  ValidationPipe, 
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Cargo, Usuario } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../common/pipes/ValideUUIDPipe';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { sanitizeUser } from '../../../common/utils/sanitizeUser';
import type { ApiResponse } from '../../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from '../../../common/interfaces/AuthenticatedRequest';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseService } from '../../../common/firebase/firebase.service';
import { AuthRoles } from '../../../auth/decorators/auth-roles.decorator';

@Controller()
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @AuthRoles(Cargo.ADMIN, Cargo.MODERADOR)
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createUsuarioDto: CreateUsuarioDto
  ): Promise<ApiResponse<Omit<Usuario, 'senha'>>> {
    const response = await this.usuariosService.create(createUsuarioDto, req.user.instituicaoId);
    return {
      message: 'Usuário(a) criado(a) com sucesso.',
      data: sanitizeUser(response)
    }
  }

  @Get()
  @AuthRoles(Cargo.ADMIN, Cargo.MODERADOR)
  async findAll(
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<Omit<Usuario, 'senha'>[]>> {
    const response = await this.usuariosService.findAll(req.user.instituicaoId);
    return {
      message: 'Usuários listados com sucesso.',
      data: response.map(sanitizeUser)
    }
  }

  @Get(':id')
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Omit<Usuario, 'senha'>>> {
    const response = await this.usuariosService.findOne(id, req.user.instituicaoId);
    return {
      message: 'Usuário(a) buscado(a) com sucesso.',
      data: sanitizeUser(response)
    }
  }

  @Patch(':id') 
  @AuthRoles(Cargo.ADMIN, Cargo.MODERADOR)
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateUsuarioDto: UpdateUsuarioDto
  ): Promise<ApiResponse<Omit<Usuario, 'senha'>>> {
    const response = await this.usuariosService.update(id, updateUsuarioDto, req.user.instituicaoId);
    return {
      message: 'Usuário(a) atualizado(a) com sucesso.',
      data: sanitizeUser(response)
    }
  }

  @Delete(':id')
  @AuthRoles(Cargo.ADMIN, Cargo.MODERADOR)
  async delete(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Omit<Usuario, 'senha'>>> {
    const response = await this.usuariosService.remove(id, req.user.instituicaoId);
    return {
      message: `Usuário(a) ${response.primeiroNome} ${response.sobrenome} deletado(a) com sucesso.`,
      data: sanitizeUser(response)
    }
  }

  @Post('me/foto-perfil')
  @UseInterceptors(FileInterceptor('foto'))
  async uploadAndUpdateFotoPerfil(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<{ fotoPerfilUrl: string }>> {
    const userId = req.user.id;
    const instituicaoId = req.user.instituicaoId

    const fotoPerfilUrl = await this.usuariosService.uploadAndUpdateFotoPerfil(
      file,
      userId,
      instituicaoId
    )

    return {
      message: 'Foto de perfil atualizada com sucesso.',
      data: { fotoPerfilUrl },
    };
  }
}
