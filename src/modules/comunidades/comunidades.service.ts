import { AulasService } from './../academico/aulas/aulas.service';
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

  async create(createComunidadeDto: CreateComunidadeDto): Promise<Comunidade> {
    // Verifica se a aula existe
    await this.aulasService.findOne(createComunidadeDto.aulaId);

    const createdComutities = await this.comunidadesRepository.create({ data: createComunidadeDto });
    return createdComutities;
  }

  async findAll(): Promise<Comunidade[]> {
    const list = await this.comunidadesRepository.findAll();
    return list;
  }

  async findOne(id: string): Promise<Comunidade> {
    const existingComutitie = await this.comunidadesRepository.findOne({ where: { id } });
    if (!existingComutitie) throw new NotFoundException('Comunidade não encontrada.');
    return existingComutitie;
  }

  async update(id: string, updateComunidadeDto: UpdateComunidadeDto): Promise<Comunidade> {
    const existingComutitie = await this.comunidadesRepository.findOne({ where: { id } });
    if (!existingComutitie) throw new NotFoundException('Comunidade não encontrada.');

    const updated = await this.comunidadesRepository.update({
      where: { id },
      data: updateComunidadeDto
    });
    return updated;
  }

  async remove(id: string): Promise<Comunidade> {
    const existingComutitie = await this.comunidadesRepository.findOne({ where: { id } });
    if (!existingComutitie) throw new NotFoundException('Comunidade não encontrada.');

    const deletedComutitie = await this.comunidadesRepository.delete({ where: { id } });
    return deletedComutitie;
  }
}
