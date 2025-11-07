import { InstituicoesService } from './../instituicoes/instituicoes.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuariosRepository } from './usuarios.repository';
import { Usuario } from '@prisma/client';
import { NotFoundException, Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly usuariosRepository: UsuariosRepository,
    private readonly instituicoesService: InstituicoesService
  ) {}
  
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Verifica se a instituicao existe
    await this.instituicoesService.findOne(createUsuarioDto.instituicaoId)

    const existingUser = await this.usuariosRepository.findOneByEmail(createUsuarioDto.email);
    if (existingUser) throw new ConflictException('Esse e-mail já foi cadastrado.');

    const hashPassword = await bcrypt.hash(createUsuarioDto.senha, 10);

    const modifiedUser = {
      ...createUsuarioDto, 
      senha: hashPassword,
      dataNascimento: new Date(createUsuarioDto.dataNascimento)
    }

    const createdUser = await this.usuariosRepository.create({ data: modifiedUser });
    return createdUser;
  }

  async findAll(): Promise<Usuario[]> {
    const users = await this.usuariosRepository.findAll();
    return users;
  }

  async findOne(id: string): Promise<Usuario> {
    const existingUser = await this.usuariosRepository.findOne({ id });
    if (!existingUser) throw new NotFoundException('Usuário não encontrado.');
    return existingUser;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const existingUser = await this.usuariosRepository.findOne({ id });
    if (!existingUser) throw new NotFoundException('Usuário não encontrado.');
    const updatedUser = await this.usuariosRepository.update({
      where: { id },
      data: updateUsuarioDto
    });
    return updatedUser;
  }

  async remove(id: string): Promise<Usuario> {
    const existingUser = await this.usuariosRepository.findOne({ id });
    if (!existingUser) throw new NotFoundException('Usuário não encontrado.');
    const deletedUser = await this.usuariosRepository.delete({ where: { id } });
    return deletedUser;
  }
}