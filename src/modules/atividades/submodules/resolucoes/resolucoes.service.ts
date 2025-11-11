import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ResolucoesRepository } from './resolucoes.repository';
import { CreateResolucaoDto } from './dto/create-resolucao.dto';
import { UpdateResolucaoDto } from './dto/update-resolucao.dto';
import { Resolucao } from '@prisma/client';
import { AtividadesService } from '../../atividades.service';
import { UsuariosService } from '../../../usuarios/usuarios.service';

@Injectable()
export class ResolucoesService {
  constructor(
    private readonly resolucoesRepository: ResolucoesRepository,
    private readonly atividadesService: AtividadesService,
    private readonly usuariosService: UsuariosService
  ) {}

  async create(createResolucaoDto: CreateResolucaoDto): Promise<Resolucao> {
    // Verifica se a atividade existe
    await this.atividadesService.findOne(createResolucaoDto.atividadeId);

    // Verifica se o aluno existe
    const existingAluno = await this.usuariosService.findOne(createResolucaoDto.alunoId);

    // Verifica se o id é realmente de um aluno
    if (existingAluno.cargo !== 'ALUNO') {
      throw new ForbiddenException('Apenas alunos podem resolver uma atividade.');
    }

    const createdResolucao = await this.resolucoesRepository.create({ data: createResolucaoDto });
    return createdResolucao;
  }

  async findAll(): Promise<Resolucao[]> {
    const resolucoes = await this.resolucoesRepository.findAll();
    return resolucoes;
  }

  async findOne(id: string): Promise<Resolucao> {
    const existingResolucao = await this.resolucoesRepository.findOne({ where: { id } });
    if (!existingResolucao) throw new NotFoundException('Resolução não encontrada.');
    return existingResolucao;
  }

  async update(id: string, updateResolucaoDto: UpdateResolucaoDto): Promise<Resolucao> {
    const existingResolucao = await this.resolucoesRepository.findOne({ where: { id } });
    if (!existingResolucao) throw new NotFoundException('Resolução não encontrada.');

    const updatedResolucao = await this.resolucoesRepository.update({
      where: { id },
      data: updateResolucaoDto
    });
    return updatedResolucao;
  }

  async remove(id: string): Promise<Resolucao> {
    const existingResolucao = await this.resolucoesRepository.findOne({ where: { id } });
    if (!existingResolucao) throw new NotFoundException('Resolução não encontrada.');

    const deletedResolucao = await this.resolucoesRepository.delete({ where: { id } });
    return deletedResolucao;
  }
}
