import { AulasService } from '../academico/aulas/aulas.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ComunidadesRepository } from './comunidades.repository';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';
import { Comunidade } from '@prisma/client';

@Injectable()
export class ComunidadesService {
  constructor(
    private readonly comunidadesRepository: ComunidadesRepository,
    private readonly aulasService: AulasService
  ) {}

  async create(createComunidadeDto: CreateComunidadeDto, instituicaoId: string): Promise<Comunidade> {
    // Verifica se a aula existe
    await this.aulasService.findOne(createComunidadeDto.aulaId, instituicaoId);

    const createdComutities = await this.comunidadesRepository.create({
      data: {
        titulo: createComunidadeDto.titulo,
        fotoCaminho: createComunidadeDto.fotoCaminho ?? null,
        aulaId: createComunidadeDto.aulaId,
        instituicaoId
      }
    });
    return createdComutities;
  }

  async findAll(instituicaoId: string): Promise<Comunidade[]> {
    const list = await this.comunidadesRepository.findAll({ where: { instituicaoId } });
    return list;
  }

  async findOne(id: string, instituicaoId: string): Promise<Comunidade> {
    const existingComutitie = await this.comunidadesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingComutitie) throw new NotFoundException('Comunidade não encontrada.');
    return existingComutitie;
  }

  async update(id: string, updateComunidadeDto: UpdateComunidadeDto, instituicaoId: string): Promise<Comunidade> {
    const existingComutitie = await this.comunidadesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingComutitie) throw new NotFoundException('Comunidade não encontrada.');

    const updated = await this.comunidadesRepository.update({
      where: { id },
      data: updateComunidadeDto
    });
    return updated;
  }

  async remove(id: string, instituicaoId: string): Promise<Comunidade> {
    const existingComutitie = await this.comunidadesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingComutitie) throw new NotFoundException('Comunidade não encontrada.');

    const deletedComutitie = await this.comunidadesRepository.delete({ where: { id } });
    return deletedComutitie;
  }

  async getStudentCommunities(userId: string, instituicaoId: string) {
    const comunitities = await this.comunidadesRepository.findAll({
      where: {
        instituicaoId,
        aula: {
          turma: {
            alunos: { some: { userId } }
          }
        }
      },
      select: { id: true, titulo: true }
    });
    return comunitities
  }

  async getTeacherCommunities(userId: string, instituicaoId: string) {
    const comunitities = await this.comunidadesRepository.findAll({
      where: {
        instituicaoId,
        aula: { professor: { userId } }
      },
      select: { id: true, titulo: true }
    });
    return comunitities
  }
}
