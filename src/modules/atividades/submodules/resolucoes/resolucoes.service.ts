import { Injectable, NotFoundException } from '@nestjs/common';
import { ResolucoesRepository } from './resolucoes.repository';
import { CreateResolucaoDto } from './dto/create-resolucao.dto';
import { UpdateResolucaoDto } from './dto/update-resolucao.dto';
import { Resolucao } from '@prisma/client';
import { AtividadesService } from '../../atividades.service';

@Injectable()
export class ResolucoesService {
  constructor(
    private readonly resolucoesRepository: ResolucoesRepository,
    private readonly atividadesService: AtividadesService
  ) {}

  async create(createResolucaoDto: CreateResolucaoDto): Promise<Resolucao> {
    // Verifica se a atividade existe
    await this.atividadesService.findOne(createResolucaoDto.atividadeId);

    // Verifica se o aluno existe

    const createdResolucao = await this.resolucoesRepository.create({
      data: createResolucaoDto
    });
    return createdResolucao;
  }

  async findAll(): Promise<Resolucao[]> {
    const list = await this.resolucoesRepository.findAll();
    return list;
  }

  async findOne(id: string): Promise<Resolucao> {
    const existingResolucao = await this.resolucoesRepository.findOne({ where: { id } });
    if (!existingResolucao) throw new NotFoundException('Resolução não encontrada.');
    return existingResolucao;
  }

  async update(id: string, updateResolucaoDto: UpdateResolucaoDto): Promise<Resolucao> {
    const existingResolucao = await this.resolucoesRepository.findOne({ where: { id } });
    if (!existingResolucao) throw new NotFoundException('Resolução não encontrada.');

    const updated = await this.resolucoesRepository.update({
      where: { id },
      data: updateResolucaoDto
    });
    return updated;
  }

  async remove(id: string): Promise<Resolucao> {
    const existingResolucao = await this.resolucoesRepository.findOne({ where: { id } });
    if (!existingResolucao) throw new NotFoundException('Resolução não encontrada.');

    const deletedResolucao = await this.resolucoesRepository.delete({ where: { id } });
    return deletedResolucao;
  }
}
