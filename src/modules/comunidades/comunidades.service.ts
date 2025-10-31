import { TurmasService } from './../academico/turmas/turmas.service';
import { MateriasService } from './../academico/materias/materias.service';
import { UsuariosService } from './../usuarios/usuarios.service';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ComunidadesRepository } from './comunidades.repository';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';
import { Comunidade } from '@prisma/client';

@Injectable()
export class ComunidadesService {
  constructor(
    private readonly comunidadesRepository: ComunidadesRepository,
    private readonly usuariosService: UsuariosService,
    private readonly materiasService: MateriasService,
    private readonly turmasService: TurmasService
  ) {}

  async create(createComunidadeDto: CreateComunidadeDto): Promise<Comunidade> {
    // Verifica se o id do professor existe
    const existingTeacher = await this.usuariosService.findOne(createComunidadeDto.professorId)
    
    // Verifica se o id é realmente de um professor
    if (existingTeacher.cargo !== 'PROFESSOR') {
      throw new ForbiddenException('Apenas professores podem ser cadastrados a uma materia.')
    }

    // Verifica se a materia existe
    await this.materiasService.findOne(createComunidadeDto.materiaId)

    // Verifica se a turma existe
    await this.turmasService.findOne(createComunidadeDto.turmaId)

    const createdComutities = await this.comunidadesRepository.create(createComunidadeDto);
    return createdComutities;
  }

  async findAll(): Promise<Comunidade[]> {
    const list = await this.comunidadesRepository.findAll();
    return list;
  }

  async findOne(id: string): Promise<Comunidade> {
    const existingComutitie = await this.comunidadesRepository.findOne({ id });
    if (!existingComutitie) throw new NotFoundException('Comunidade não encontrada.');
    return existingComutitie;
  }

  async update(id: string, updateDto: UpdateComunidadeDto): Promise<Comunidade> {
    const existingComutitie = await this.comunidadesRepository.findOne({ id });
    if (!existingComutitie) throw new NotFoundException('Comunidade não encontrada.');

    const updated = await this.comunidadesRepository.update({ id }, updateDto);
    return updated;
  }

  async remove(id: string): Promise<Comunidade> {
    const existingComutitie = await this.comunidadesRepository.findOne({ id });
    if (!existingComutitie) throw new NotFoundException('Comunidade não encontrada.');

    const deletedComutitie = await this.comunidadesRepository.delete({ id });
    return deletedComutitie;
  }
}
