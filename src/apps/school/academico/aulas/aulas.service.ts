import { PrismaService } from './../../../../common/database/prisma.service';
import { MateriasService } from '../materias/materias.service';
import { TurmasService } from '../turmas/turmas.service';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AulasRepository } from './aulas.repository';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { Aula } from '@prisma/client';

@Injectable()
export class AulasService {
  constructor(
    private readonly aulasRepository: AulasRepository,
    private readonly usuariosService: UsuariosService,
    private readonly turmasService: TurmasService,
    private readonly materiasService: MateriasService,
    private readonly prisma: PrismaService
  ) {}

  async create(createAulaDto: CreateAulaDto, instituicaoId: string): Promise<Aula> {
    // Verifica se o id do professor existe
    const existingTeacher = await this.usuariosService.findOne(createAulaDto.professorId, instituicaoId);
    
    // Verifica se o id é realmente de um professor
    if (existingTeacher.cargo !== 'PROFESSOR') {
      throw new ForbiddenException('Apenas usuários com cargo PROFESSOR podem ser vinculados a uma aula.');
    }

    // Verifica se a turma existe
    await this.turmasService.findOne(createAulaDto.turmaId, instituicaoId);

    // Verifica se a materia existe
    await this.materiasService.findOne(createAulaDto.materiaId, instituicaoId)
    
    const createdAula = await this.prisma.$transaction(async (tx) => {
      const aula = await tx.aula.create({ 
        data: {
          professorId: createAulaDto.professorId,
          turmaId: createAulaDto.turmaId,
          materiaId: createAulaDto.materiaId,
          instituicaoId
        }
      });

      await tx.comunidade.create({
        data: {
          titulo: createAulaDto.nomeComunidade,
          aulaId: aula.id,
          instituicaoId
        }
      });

      return aula
    });

    return createdAula
  }

  async findAll(instituicaoId: string): Promise<Aula[]> {
    const aulas = await this.aulasRepository.findAll({
      where: { instituicaoId },
      include: {
        professor: true,
        turma: true,
        materia: true,
        comunidade: true
      }
    });
    return aulas;
  }

  async findOne(id: string, instituicaoId: string): Promise<Aula> {
    const existingAula = await this.aulasRepository.findOne({
      where: { id, instituicaoId },
      include: {
        professor: true,
        turma: true,
        materia: true,
        comunidade: true
      }
    });
    if (!existingAula) throw new NotFoundException('Aula não encontrada.');
    return existingAula;
  }

  async update(id: string, updateAulaDto: UpdateAulaDto, instituicaoId: string): Promise<Aula> {
    const existingAula = await this.aulasRepository.findOne({ where: { id, instituicaoId } });
    if (!existingAula) throw new NotFoundException('Aula não encontrada.');

    const updatedAula = await this.aulasRepository.update({
      where: { id },
      data: updateAulaDto
    });
    return updatedAula;
  }

  async remove(id: string, instituicaoId: string): Promise<Aula> {
    const existingAula = await this.aulasRepository.findOne({ where: { id, instituicaoId } });
    if (!existingAula) throw new NotFoundException('Aula não encontrada.');

    const deletedAula = await this.aulasRepository.delete({ where: { id } });
    return deletedAula;
  }
}
