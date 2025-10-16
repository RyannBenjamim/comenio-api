import { UsuariosService } from './../../usuarios.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { AlunosRepository } from './alunos.repository';
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Aluno } from '@prisma/client';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

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

  async update(id: string, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    const existingAluno = await this.alunosRepository.findOne({ userId: id });
    if (!existingAluno) throw new NotFoundException('Aluno não encontrado.');
    const updatedAluno = await this.alunosRepository.update({ userId: id }, updateAlunoDto);
    return updatedAluno;
  }
}