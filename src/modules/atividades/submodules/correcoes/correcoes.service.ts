import { UsuariosService } from './../../../usuarios/usuarios.service';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CorrecoesRepository } from './correcoes.repository';
import { CreateCorrecaoDto } from './dto/create-correcao.dto';
import { UpdateCorrecaoDto } from './dto/update-correcao.dto';
import { Correcao } from '@prisma/client';
import { ResolucoesService } from '../resolucoes/resolucoes.service';

@Injectable()
export class CorrecoesService {
  constructor(
    private readonly correcoesRepository: CorrecoesRepository,
    private readonly resolucoesService: ResolucoesService,
    private readonly usuariosService: UsuariosService
  ) {}

  async create(createCorrecaoDto: CreateCorrecaoDto): Promise<Correcao> {
    // Verifica se a resolução existe
    await this.resolucoesService.findOne(createCorrecaoDto.resolucaoId);

    // Verifica se o id do professor existe
    const existingCorrecao = await this.usuariosService.findOne(createCorrecaoDto.professorId);
        
    // Verifica se o id é realmente de um professor
    if (existingCorrecao.cargo !== 'PROFESSOR') {
      throw new ForbiddenException('Apenas professores podem corrigir uma atividade.');
    }

    const createdCorrecao = await this.correcoesRepository.create({ data: createCorrecaoDto });
    return createdCorrecao;
  }

  async findAll(): Promise<Correcao[]> {
    const correcoes = await this.correcoesRepository.findAll();
    return correcoes;
  }

  async findOne(id: string): Promise<Correcao> {
    const existingCorrecao = await this.correcoesRepository.findOne({ where: { id } });
    if (!existingCorrecao) throw new NotFoundException('Correção não encontrada.');
    return existingCorrecao;
  }

  async update(id: string, updateCorrecaoDto: UpdateCorrecaoDto): Promise<Correcao> {
    const existingCorrecao = await this.correcoesRepository.findOne({ where: { id } });
    if (!existingCorrecao) throw new NotFoundException('Correção não encontrada.');

    const updated = await this.correcoesRepository.update({
      where: { id },
      data: updateCorrecaoDto
    });
    return updated;
  }

  async remove(id: string): Promise<Correcao> {
    const existingCorrecao = await this.correcoesRepository.findOne({ where: { id } });
    if (!existingCorrecao) throw new NotFoundException('Correção não encontrada.');

    const deletedCorrecao = await this.correcoesRepository.delete({ where: { id } });
    return deletedCorrecao;
  }
}
