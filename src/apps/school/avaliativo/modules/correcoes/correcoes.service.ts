import { UsuariosService } from '../../../usuarios/usuarios.service';
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

  async create(createCorrecaoDto: CreateCorrecaoDto, instituicaoId: string): Promise<Correcao> {
    // Verifica se a resolução existe
    await this.resolucoesService.findOne(createCorrecaoDto.resolucaoId, instituicaoId);

    // Verifica se o id do professor existe
    const existingTeacher = await this.usuariosService.findOne(createCorrecaoDto.professorId, instituicaoId);
        
    // Verifica se o id é realmente de um professor
    if (existingTeacher.cargo !== 'PROFESSOR') {
      throw new ForbiddenException('Apenas professores podem corrigir uma atividade.');
    }

    const createdCorrecao = await this.correcoesRepository.create({
      data: {
        resolucaoId: createCorrecaoDto.resolucaoId,
        professorId: createCorrecaoDto.professorId,
        conteudo: createCorrecaoDto.conteudo,
        pdfCaminho: null,
        instituicaoId
      }
    });
    return createdCorrecao;
  }

  async findAll(instituicaoId: string): Promise<Correcao[]> {
    const correcoes = await this.correcoesRepository.findAll({ where: { instituicaoId } });
    return correcoes;
  }

  async findOne(id: string, instituicaoId: string): Promise<Correcao> {
    const existingCorrecao = await this.correcoesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingCorrecao) throw new NotFoundException('Correção não encontrada.');
    return existingCorrecao;
  }

  async update(id: string, updateCorrecaoDto: UpdateCorrecaoDto, instituicaoId: string): Promise<Correcao> {
    const existingCorrecao = await this.correcoesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingCorrecao) throw new NotFoundException('Correção não encontrada.');

    const updatedCorrecao = await this.correcoesRepository.update({
      where: { id },
      data: updateCorrecaoDto
    });
    return updatedCorrecao;
  }

  async remove(id: string, instituicaoId: string): Promise<Correcao> {
    const existingCorrecao = await this.correcoesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingCorrecao) throw new NotFoundException('Correção não encontrada.');

    const deletedCorrecao = await this.correcoesRepository.delete({ where: { id } });
    return deletedCorrecao;
  }
}