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

  async create(createAtividadeDto: CreateAtividadeDto): Promise<Atividade> {
    // Verifica se a comunidade existe
    await this.comunidadesService.findOne(createAtividadeDto.comunidadeId);

    const createdAtividade = await this.atividadesRepository.create({ data: createAtividadeDto });
    return createdAtividade;
  }

  async findAll(): Promise<Atividade[]> {
    const atividades = await this.atividadesRepository.findAll();
    return atividades;
  }

  async findOne(id: string): Promise<Atividade> {
    const existingAtividade = await this.atividadesRepository.findOne({ where: { id } });
    if (!existingAtividade) throw new NotFoundException('Atividade não encontrada.');
    return existingAtividade;
  }

  async update(id: string, updateAtividadeDto: UpdateAtividadeDto): Promise<Atividade> {
    const existingAtividade = await this.atividadesRepository.findOne({ where: { id } });
    if (!existingAtividade) throw new NotFoundException('Atividade não encontrada.');

    const updated = await this.atividadesRepository.update({
      where: { id },
      data: updateAtividadeDto
    });
    return updated;
  }

  async remove(id: string): Promise<Atividade> {
    const existingAtividade = await this.atividadesRepository.findOne({ where: { id } });
    if (!existingAtividade) throw new NotFoundException('Atividade não encontrada.');

    const deletedAtividade = await this.atividadesRepository.delete({ where: { id } });
    return deletedAtividade;
  }
}
