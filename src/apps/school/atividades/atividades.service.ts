import { Injectable, NotFoundException } from '@nestjs/common';
import { AtividadesRepository } from './atividades.repository';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';
import { Atividade } from '@prisma/client';
import { ComunidadesService } from '../comunidades/comunidades.service';

@Injectable()
export class AtividadesService {
  constructor(
    private readonly atividadesRepository: AtividadesRepository,
    private readonly comunidadesService: ComunidadesService
  ) {}

  async create(createAtividadeDto: CreateAtividadeDto, instituicaoId: string): Promise<Atividade> {
    // Verifica se a comunidade existe
    await this.comunidadesService.findOne(createAtividadeDto.comunidadeId, instituicaoId);

    const createdAtividade = await this.atividadesRepository.create({
      data: {
        titulo: createAtividadeDto.titulo,
        conteudo: createAtividadeDto.conteudo,
        pdfCaminho: createAtividadeDto.pdfCaminho ?? null,
        dataInicio: createAtividadeDto.dataInicio,
        dataFim: createAtividadeDto.dataFim,
        comunidadeId: createAtividadeDto.comunidadeId,
        instituicaoId
      }
    });
    return createdAtividade;
  }

  async findAll(instituicaoId: string): Promise<Atividade[]> {
    const atividades = await this.atividadesRepository.findAll({ where: { instituicaoId } });
    return atividades;
  }

  async findOne(id: string, instituicaoId: string): Promise<Atividade> {
    const existingAtividade = await this.atividadesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingAtividade) throw new NotFoundException('Atividade não encontrada.');
    return existingAtividade;
  }

  async update(id: string, updateAtividadeDto: UpdateAtividadeDto, instituicaoId: string): Promise<Atividade> {
    const existingAtividade = await this.atividadesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingAtividade) throw new NotFoundException('Atividade não encontrada.');

    const updatedAtividade = await this.atividadesRepository.update({
      where: { id },
      data: updateAtividadeDto
    });
    return updatedAtividade;
  }

  async remove(id: string, instituicaoId: string): Promise<Atividade> {
    const existingAtividade = await this.atividadesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingAtividade) throw new NotFoundException('Atividade não encontrada.');

    const deletedAtividade = await this.atividadesRepository.delete({ where: { id } });
    return deletedAtividade;
  }
}
