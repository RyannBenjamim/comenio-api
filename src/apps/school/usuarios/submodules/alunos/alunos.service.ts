import { UsuariosService } from '../../usuarios.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { AlunosRepository } from './alunos.repository';
import { TurmasService } from '../../../academico/turmas/turmas.service';
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Aluno } from '@prisma/client';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunosService {
  constructor(
    private readonly alunosRepository: AlunosRepository,
    private readonly usuariosService: UsuariosService,
    private readonly turmasService: TurmasService,
  ) {}

  async create(createAlunoDto: CreateAlunoDto, instituicaoId: string): Promise<Aluno> {
    // Verifa se o usuário existe
    await this.usuariosService.findOne(createAlunoDto.userId, instituicaoId);

    // Verifica se já existe um aluno cadastrado com esse userId
    const existingAluno = await this.alunosRepository.findOne({ where: {
      userId: createAlunoDto.userId
    }});
    if (existingAluno) throw new ConflictException('Aluno já cadastrado para esse usuário.');

    // Verifica se a turma existe
    await this.turmasService.findOne(createAlunoDto.turmaId, instituicaoId);
    
    const createdAluno = await this.alunosRepository.create({ data: createAlunoDto });
    return createdAluno
  }

  async update(id: string, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    const existingAluno = await this.alunosRepository.findOne({ where: { userId: id } });
    if (!existingAluno) throw new NotFoundException('Aluno não encontrado.');

    const updatedAluno = await this.alunosRepository.update({
      where: { userId: id },
      data: updateAlunoDto
    });
    return updatedAluno;
  }
}