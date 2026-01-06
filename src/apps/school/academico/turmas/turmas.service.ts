import { Injectable, NotFoundException } from '@nestjs/common';
import { TurmasRepository } from './turmas.repository';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { Turma } from '@prisma/client';

@Injectable()
export class TurmasService {
  constructor(private readonly turmasRepository: TurmasRepository) {}

  async create(createTurmaDto: CreateTurmaDto, instituicaoId: string): Promise<Turma> {
    const createdClass = await this.turmasRepository.create({ 
      data: {
        titulo: createTurmaDto.titulo,
        periodo: createTurmaDto.periodo,
        instituicaoId
      } 
    });
    return createdClass;
  }

  async findAll(instituicaoId: string): Promise<Turma[]> {
    const classes = await this.turmasRepository.findAll({ where: { instituicaoId } });
    return classes;
  }

  async findOne(id: string, instituicaoId: string): Promise<Turma> {
    const existingClass = await this.turmasRepository.findOne({ where: { id, instituicaoId } });
    if (!existingClass) throw new NotFoundException('Turma não encontrada.');
    return existingClass;
  }

  async update(id: string, instituicaoId: string, updateTurmaDto: UpdateTurmaDto): Promise<Turma> {
    const existingClass = await this.turmasRepository.findOne({ where: { id, instituicaoId } });
    if (!existingClass) throw new NotFoundException('Turma não encontrada.');

    const updatedClass = await this.turmasRepository.update({
      where: { id },
      data: updateTurmaDto
    });
    return updatedClass;
  }

  async remove(id: string, instituicaoId: string): Promise<Turma> {
    const existingClass = await this.turmasRepository.findOne({ where: { id, instituicaoId } });
    if (!existingClass) throw new NotFoundException('Turma não encontrada.');

    const deletedClass = await this.turmasRepository.delete({ where: { id } });
    return deletedClass;
  }
}
