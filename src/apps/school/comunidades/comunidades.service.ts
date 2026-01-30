import { TurmasService } from './../academico/turmas/turmas.service';
import { AulasService } from '../academico/aulas/aulas.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ComunidadesRepository } from './comunidades.repository';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';
import { Comunidade } from '@prisma/client';
import { ComunidadeListDto } from './dto/comunidade-list.dto';
import { ComunidadeWithProfessor } from './types/ComunidadeWithProfessor';
import { ComunidadewithProfessorId } from './types/ComunidadeWithProfessorId';

@Injectable()
export class ComunidadesService {
  constructor(
    private readonly comunidadesRepository: ComunidadesRepository,
    private readonly aulasService: AulasService,
    private readonly turmasService: TurmasService
  ) {}

  async create(createComunidadeDto: CreateComunidadeDto, instituicaoId: string): Promise<Comunidade> {
    // Verifica se a aula existe
    await this.aulasService.findOne(createComunidadeDto.aulaId, instituicaoId);

    const createdComutities = await this.comunidadesRepository.create({
      data: {
        titulo: createComunidadeDto.titulo,
        aulaId: createComunidadeDto.aulaId,
        instituicaoId
      }
    });
    return createdComutities;
  }

  async findAll(
    instituicaoId: string,
    turmaId?: string
  ): Promise<ComunidadeListDto[]> {
    const where: any = { instituicaoId };

    if (turmaId) {
      await this.turmasService.findOne(turmaId, instituicaoId);
      where.aula = { turmaId };
    }

    const list = await this.comunidadesRepository.findAll({ 
      where,
      include: {
        aula: {
          select: {
            professor: {
              select: {
                usuario: {
                  select: {
                    primeiroNome: true,
                    sobrenome: true
                  }
                }
              }
            }
          }
        }
      }
    }) as ComunidadeWithProfessor[];

    return list.map((comunidade) => ({
      id: comunidade.id,
      titulo: comunidade.titulo,
      aulaId: comunidade.aulaId,
      professor: `${comunidade.aula.professor.usuario.primeiroNome} ${comunidade.aula.professor.usuario.sobrenome}`,
      createdAt: comunidade.createdAt,
      updatedAt: comunidade.updatedAt
    }));
  }

  async findOne(id: string, instituicaoId: string): Promise<Comunidade> {
    const existingComutitie = await this.comunidadesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingComutitie) throw new NotFoundException('Comunidade não encontrada.');
    return existingComutitie;
  }

  async findOneWithProfessor(id: string, instituicaoId: string): Promise<ComunidadewithProfessorId> {
    const existingComutitie = await this.comunidadesRepository.findOneWithProfessor(id, instituicaoId);
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

  async getStudentCommunities(userId: string, instituicaoId: string): Promise<{ id: string, titulo: string }[]> {
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

  async getTeacherCommunities(userId: string, instituicaoId: string): Promise<{ id: string, titulo: string }[]> {
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
