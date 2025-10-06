import { UsuariosService } from './../../usuarios.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { AlunosRepository } from './alunos.repository';
import { ConflictException, Injectable } from "@nestjs/common";
import { Aluno } from '@prisma/client';

@Injectable()
export class AlunosService {
  constructor(
    private readonly alunosRepository: AlunosRepository,
    private readonly usuariosService: UsuariosService,
    // private readonly turmasService: TurmasService, // Ainda não foi criado
  ) {}

  async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    // Verifa se o usuário existe
    await this.usuariosService.findOne(createAlunoDto.userId);

    const existingAluno = await this.alunosRepository.findOne({ userId: createAlunoDto.userId });
    if (existingAluno) throw new ConflictException('Aluno já cadastrado para esse usuário.')

    // Adicionar validação da existência da turma do aluno
    // await this.turmaService.findOne(createAlunoDto.turmaId);
    
    const createdAluno = await this.alunosRepository.create(createAlunoDto);
    return createdAluno
  }
}