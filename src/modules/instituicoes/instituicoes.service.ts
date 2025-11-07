import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';
import { InstituicoesRepository } from './instituicoes.repository';
import { Instituicao } from '@prisma/client';

@Injectable()
export class InstituicoesService {
  constructor(private readonly instituicoesRepository: InstituicoesRepository) {}

  async create(createInstituicaoDto: CreateInstituicaoDto): Promise<Instituicao> {
    const createdInstitution = await this.instituicoesRepository.create({ data: createInstituicaoDto });
    return createdInstitution;
  }

  async findAll(): Promise<Instituicao[]> {
    const institutions = await this.instituicoesRepository.findAll();
    return institutions;
  }

  async findOne(id: string): Promise<Instituicao> {
    const existingInstitution = await this.instituicoesRepository.findOne({ where: { id } });
    if (!existingInstitution) throw new NotFoundException('Instituição não encontrada.');
    return existingInstitution;
  }

  async update(id: string, updateInstituicaoDto: UpdateInstituicaoDto): Promise<Instituicao> {
    const existingInstitution = await this.instituicoesRepository.findOne({ where: { id } });
    if (!existingInstitution) throw new NotFoundException('Instituição não encontrada.');
    
    const updatedInstitution = await this.instituicoesRepository.update({
      where: { id },
      data: updateInstituicaoDto
    });
    return updatedInstitution;
  }

  async remove(id: string): Promise<Instituicao> {
    const existingInstitution = await this.instituicoesRepository.findOne({ where: { id } });
    if (!existingInstitution) throw new NotFoundException('Instituição não encontrada.');
    const deletedInstitution = await this.instituicoesRepository.delete({ where: { id } });
    return deletedInstitution;
  }
}
