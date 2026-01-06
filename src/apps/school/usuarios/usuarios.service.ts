import { InstituicoesService } from '../../admin/instituicoes/instituicoes.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuariosRepository } from './usuarios.repository';
import { FirebaseService } from '../../../common/firebase/firebase.service';
import { Usuario } from '@prisma/client';
import { NotFoundException, Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import path from 'path';


@Injectable()
export class UsuariosService {
  constructor(
    private readonly usuariosRepository: UsuariosRepository,
    private readonly instituicoesService: InstituicoesService,
    private readonly firebaseService: FirebaseService
  ) {}
  
  async create(createUsuarioDto: CreateUsuarioDto, instituicaoId: string): Promise<Usuario> {
    // Verifica se a instituicao existe
    await this.instituicoesService.findOne(instituicaoId)

    const existingUser = await this.usuariosRepository.findOneByEmail(createUsuarioDto.email);
    if (existingUser) throw new ConflictException('Esse e-mail já foi cadastrado.');

    const hashPassword = await bcrypt.hash(createUsuarioDto.senha, 10);

    const modifiedUser = {
      ...createUsuarioDto, 
      senha: hashPassword,
      dataNascimento: new Date(createUsuarioDto.dataNascimento)
    }

    const createdUser = await this.usuariosRepository.create({
      data: {
        primeiroNome: modifiedUser.primeiroNome,
        sobrenome: modifiedUser.sobrenome,
        nickname: modifiedUser.primeiroNome,
        bio: null,
        email: modifiedUser.email,
        senha: modifiedUser.senha,
        dataNascimento: modifiedUser.dataNascimento,
        telefone: modifiedUser.telefone,
        fotoPerfilCaminho: null,
        fotoPerfilUrl: null,
        cargo: modifiedUser.cargo,
        instituicaoId
      }
    });
    return createdUser;
  }

  async findAll(instituicaoId: string): Promise<Usuario[]> {
    const users = await this.usuariosRepository.findAll({ where: { instituicaoId } });
    return users;
  }

  async findOne(id: string, instituicaoId: string): Promise<Usuario> {
    const existingUser = await this.usuariosRepository.findOne({ id, instituicaoId });
    if (!existingUser) throw new NotFoundException('Usuário não encontrado.');
    return existingUser;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto, instituicaoId: string): Promise<Usuario> {
    const existingUser = await this.usuariosRepository.findOne({ id, instituicaoId });
    if (!existingUser) throw new NotFoundException('Usuário não encontrado.');
    const updatedUser = await this.usuariosRepository.update({
      where: { id },
      data: updateUsuarioDto
    });
    return updatedUser;
  }

  async remove(id: string, instituicaoId: string): Promise<Usuario> {
    const existingUser = await this.usuariosRepository.findOne({ id, instituicaoId });
    if (!existingUser) throw new NotFoundException('Usuário não encontrado.');
    const deletedUser = await this.usuariosRepository.delete({ where: { id } });
    return deletedUser;
  }

  async atualizarFotoPerfil(id: string, fotoPerfilUrl: string, instituicaoId: string) {
    return this.usuariosRepository.update({
      where: { id, instituicaoId },
      data: { fotoPerfilUrl },
    });
  }

  async uploadAndUpdateFotoPerfil(file: Express.Multer.File, userId: string, instituicaoId: string): Promise<string> {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Formato de imagem não suportado. Use JPG, PNG ou WEBP.',
      );
    }
    
    const usuario = await this.findOne(
      userId,
      instituicaoId,
    );
        
    if (usuario?.fotoPerfilCaminho) {
      await this.firebaseService.deleteFile(usuario.fotoPerfilCaminho);
    }
    
    const ext = path.extname(file.originalname).toLowerCase();
    const uuid = randomUUID();
    const caminho = `instituicoes/${instituicaoId}/usuarios/${userId}/perfil/perfil-${uuid}${ext}`;
    
    const fotoPerfilUrl = await this.firebaseService.uploadFile(
      caminho,
      file.buffer,
      file.mimetype,
    );

    await this.atualizarFotoPerfil(userId, fotoPerfilUrl, instituicaoId);

    return fotoPerfilUrl
  }
}