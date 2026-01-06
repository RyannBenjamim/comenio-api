import { Injectable, NotFoundException } from '@nestjs/common';
import { MateriasRepository } from './materias.repository';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from '@prisma/client';

@Injectable()
export class MateriasService {
  constructor(private readonly materiasRepository: MateriasRepository) {}

  async create(createMateriaDto: CreateMateriaDto, instituicaoId: string): Promise<Materia> {
    const createdSubject = await this.materiasRepository.create({ 
      data: {
        titulo: createMateriaDto.titulo,
        tipo: createMateriaDto.tipo,
        instituicaoId
      } 
    });
    return createdSubject;
  }

  async findAll(instituicaoId: string): Promise<Materia[]> {
    const subjects = await this.materiasRepository.findAll({ where: { instituicaoId } });
    return subjects;
  }

  async findOne(id: string, instituicaoId: string): Promise<Materia> {
    const existingSubject = await this.materiasRepository.findOne({ where: { id, instituicaoId } });
    if (!existingSubject) throw new NotFoundException('Matéria não encontrada.');
    return existingSubject;
  }

  async update(id: string, updateMateriaDto: UpdateMateriaDto, instituicaoId: string): Promise<Materia> {
    const existingSubject = await this.materiasRepository.findOne({ where: { id, instituicaoId } });
    if (!existingSubject) throw new NotFoundException('Matéria não encontrada.');

    const updatedSubject = await this.materiasRepository.update({
      where: { id },
      data: updateMateriaDto
    });
    return updatedSubject;
  }

  async remove(id: string, instituicaoId: string): Promise<Materia> {
    const existingSubject = await this.materiasRepository.findOne({ where: { id, instituicaoId } });
    if (!existingSubject) throw new NotFoundException('Matéria não encontrada.');

    const deletedSubject = await this.materiasRepository.delete({ where: { id } });
    return deletedSubject;
  }
}
