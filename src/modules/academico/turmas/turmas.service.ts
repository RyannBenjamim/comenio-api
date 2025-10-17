import { Injectable, NotFoundException } from '@nestjs/common';
import { TurmasRepository } from './turmas.repository';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { Turma } from '@prisma/client';

@Injectable()
export class TurmasService {
  constructor(private readonly turmasRepository: TurmasRepository) {}

  async create(createTurmaDto: CreateTurmaDto): Promise<Turma> {
    const createdClass = await this.turmasRepository.create(createTurmaDto);
    return createdClass;
  }

  async findAll(): Promise<Turma[]> {
    const classes = await this.turmasRepository.findAll();
    return classes;
  }

  async findOne(id: string): Promise<Turma> {
    const existingClass = await this.turmasRepository.findOne({ id });
    if (!existingClass) throw new NotFoundException('Turma não encontrada.');
    return existingClass;
  }

  async update(id: string, updateTurmaDto: UpdateTurmaDto): Promise<Turma> {
    const existingClass = await this.turmasRepository.findOne({ id });
    if (!existingClass) throw new NotFoundException('Turma não encontrada.');

    const updatedClass = await this.turmasRepository.update({ id }, updateTurmaDto);
    return updatedClass;
  }

  async remove(id: string): Promise<Turma> {
    const existingClass = await this.turmasRepository.findOne({ id });
    if (!existingClass) throw new NotFoundException('Turma não encontrada.');

    const deletedClass = await this.turmasRepository.delete({ id });
    return deletedClass;
  }
}
