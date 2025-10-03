import { UsuariosRepository } from './../../usuarios.repository';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { AlunosRepository } from './alunos.repository';
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Aluno } from '@prisma/client';

@Injectable()
export class AlunosService {
  constructor(
    private readonly alunosRepository: AlunosRepository,
    private readonly usuariosRepository: UsuariosRepository,
    // private readonly turmasRepository: TurmasRepository, // Ainda não foi criado
  ) {}

  async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const existingUser = await this.usuariosRepository.findOne({ id: createAlunoDto.userId });
    if (!existingUser) throw new NotFoundException('Usuário não encontrado.');

    const existingAluno = await this.alunosRepository.findOne({ userId: createAlunoDto.userId });
    if (existingAluno) throw new ConflictException('Aluno já cadastrado para esse usuário.')

    // Adicionar validação da existência da turma do aluno
    //const existingTurma = await this.turmasRepository.findOne({ id: createAlunoDto.turmaId });
    //if (!existingTurma) throw new NotFoundException('Turma não encontrada.')
    
    const createdAluno = await this.alunosRepository.create(createAlunoDto);
    return createdAluno
  }
}