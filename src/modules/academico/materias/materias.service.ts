import { Injectable, NotFoundException } from '@nestjs/common';
import { MateriasRepository } from './materias.repository';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from '@prisma/client';

@Injectable()
export class MateriasService {
  constructor(private readonly materiasRepository: MateriasRepository) {}

  async create(createMateriaDto: CreateMateriaDto): Promise<Materia> {
    const createdSubject = await this.materiasRepository.create({ data: createMateriaDto });
    return createdSubject;
  }

  async findAll(): Promise<Materia[]> {
    const subjects = await this.materiasRepository.findAll();
    return subjects;
  }

  async findOne(id: string): Promise<Materia> {
    const existingSubject = await this.materiasRepository.findOne({ where: { id } });
    if (!existingSubject) throw new NotFoundException('Matéria não encontrada.');
    return existingSubject;
  }

  async update(id: string, updateMateriaDto: UpdateMateriaDto): Promise<Materia> {
    const existingSubject = await this.materiasRepository.findOne({ where: { id } });
    if (!existingSubject) throw new NotFoundException('Matéria não encontrada.');

    const updatedSubject = await this.materiasRepository.update({
      where: { id },
      data: updateMateriaDto
    });
    return updatedSubject;
  }

  async remove(id: string): Promise<Materia> {
    const existingSubject = await this.materiasRepository.findOne({ where: { id } });
    if (!existingSubject) throw new NotFoundException('Matéria não encontrada.');

    const deletedSubject = await this.materiasRepository.delete({ where: { id } });
    return deletedSubject;
  }
}
