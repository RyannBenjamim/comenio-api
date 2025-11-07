import { MateriasService } from './../materias/materias.service';
import { TurmasService } from './../turmas/turmas.service';
import { ProfessoresService } from './../../usuarios/submodules/professores/professores.service';
import { UsuariosService } from './../../usuarios/usuarios.service';
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
    private readonly professoresService: ProfessoresService,
    private readonly turmasService: TurmasService,
    private readonly materiasService: MateriasService
  ) {}

  async create(createAulaDto: CreateAulaDto): Promise<Aula> {
    // Verifica se o id do professor existe
    const existingTeacher = await this.usuariosService.findOne(createAulaDto.professorId);
    
    // Verifica se o id é realmente de um professor
    if (existingTeacher.cargo !== 'PROFESSOR') {
      throw new ForbiddenException('Apenas professores podem ser cadastrados a uma materia.');
    }

    // Verifica se a turma existe
    await this.turmasService.findOne(createAulaDto.turmaId);

    // Verifica se a materia existe
    await this.materiasService.findOne(createAulaDto.materiaId)
    
    const createdAula = await this.aulasRepository.create({ data: createAulaDto });
    return createdAula;
  }

  async findAll(): Promise<Aula[]> {
    const aulas = await this.aulasRepository.findAll({
      include: {
        professor: true,
        turma: true,
        materia: true,
        comunidade: true
      }
    });
    return aulas;
  }

  async findOne(id: string): Promise<Aula> {
    const existingAula = await this.aulasRepository.findOne({
      where: { id },
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

  async update(id: string, updateAulaDto: UpdateAulaDto): Promise<Aula> {
    const existingAula = await this.aulasRepository.findOne({ where: { id } });
    if (!existingAula) throw new NotFoundException('Aula não encontrada.');

    const updatedAula = await this.aulasRepository.update({
      where: { id },
      data: updateAulaDto
    });
    return updatedAula;
  }

  async remove(id: string): Promise<Aula> {
    const existingAula = await this.aulasRepository.findOne({ where: { id } });
    if (!existingAula) throw new NotFoundException('Aula não encontrada.');

    const deletedAula = await this.aulasRepository.delete({ where: { id } });
    return deletedAula;
  }
}
