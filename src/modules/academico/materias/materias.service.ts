import { EnrollDto } from './dto/enroll.dto';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { MateriasRepository } from './materias.repository';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { AlunosMateria, Materia } from '@prisma/client';

@Injectable()
export class MateriasService {
  constructor(
    private readonly materiasRepository: MateriasRepository,
    private readonly usuariosService: UsuariosService
  ) {}

  async create(createMateriaDto: CreateMateriaDto): Promise<Materia> {
    // Verifica se o id do professor existe
    const existingTeacher = await this.usuariosService.findOne(createMateriaDto.professorId)

    // Verifica se o id é realmente de um professor
    if (existingTeacher.cargo !== 'PROFESSOR') {
      throw new ForbiddenException('Apenas professores podem ser cadastrados a uma materia.');
    }
    
    const createdSubject = await this.materiasRepository.create(createMateriaDto);
    return createdSubject;
  }

  async findAll(): Promise<Materia[]> {
    const subjects = await this.materiasRepository.findAll();
    return subjects;
  }

  async findOne(id: string): Promise<Materia> {
    const existingSubject = await this.materiasRepository.findOne({ id });
    if (!existingSubject) throw new NotFoundException('Matéria não encontrada.');
    return existingSubject;
  }

  async update(id: string, updateMateriaDto: UpdateMateriaDto): Promise<Materia> {
    const existingSubject = await this.materiasRepository.findOne({ id });
    if (!existingSubject) throw new NotFoundException('Matéria não encontrada.');

    const updatedSubject = await this.materiasRepository.update({ id }, updateMateriaDto);
    return updatedSubject;
  }

  async remove(id: string): Promise<Materia> {
    const existingSubject = await this.materiasRepository.findOne({ id });
    if (!existingSubject) throw new NotFoundException('Matéria não encontrada.');

    const deletedSubject = await this.materiasRepository.delete({ id });
    return deletedSubject;
  }

  async enrollAlunoInMateria(enrollDto: EnrollDto): Promise<void> {
    // Verifica se o id do aluno existe
    const existingStudent = await this.usuariosService.findOne(enrollDto.alunoId)

    // Verifica se o id é realmente de um aluno
    if (existingStudent.cargo !== 'ALUNO') {
      throw new ForbiddenException('Apenas alunos podem ser cadastrados em uma materia.');
    }

    // Verifica se a matéria existe
    const existingSubject = await this.materiasRepository.findOne({ id: enrollDto.materiaId });
    if (!existingSubject) throw new NotFoundException('Matéria não encontrada.');

    // Matricula aluno na matéria
    await this.materiasRepository.enrollAlunoInMateria(enrollDto);
  }
}
