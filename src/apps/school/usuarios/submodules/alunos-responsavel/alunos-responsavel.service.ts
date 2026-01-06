import { UsuariosService } from '../../usuarios.service';
import { AlunosResponsavelRepository } from './alunos-responsavel.repository';
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { RelacaoDto } from './dto/relacao.dto';
import { AlunosResponsavel } from '@prisma/client';

@Injectable()
export class AlunosResponsavelService {
  constructor(
    private readonly alunosResponsavelRepository: AlunosResponsavelRepository,
    private readonly usuariosService: UsuariosService
  ) {}

  async create(relacaoDto: RelacaoDto, instituicaoId: string): Promise<AlunosResponsavel> {
    // Verifica se o responsavel e o aluno existem
    const [ existingResponsavel, existingAluno ] = await Promise.all([
      this.usuariosService.findOne(relacaoDto.responsavelId, instituicaoId),
      this.usuariosService.findOne(relacaoDto.alunoId, instituicaoId)
    ]);

    if (existingResponsavel.cargo != 'RESPONSAVEL' || existingAluno.cargo != 'ALUNO') {
      throw new ForbiddenException('Os ids precisam ser de usuários do tipo: resposavel e aluno.');
    } 

    // Verifica se a relação existe
    const existingRelation = await this.relationExists(relacaoDto);
    if (existingRelation) throw new ConflictException('A relação entre o responsável e o aluno já existe.');

    const createdRelation = await this.alunosResponsavelRepository.create({ data: relacaoDto })
    return createdRelation
  }

  async findAll(instituicaoId: string, responsavelId?: string, alunoId?: string): Promise<AlunosResponsavel[]> {
    let userId: string;
    let cargo: string;
    let where: any;

    if (responsavelId && alunoId) {
      throw new BadRequestException('Apenas um parâmetro de query pode ser usado por vez.');
    } else if (responsavelId) {
      userId = responsavelId;
      cargo = 'RESPONSAVEL';
      where = { responsavelId }
    } else if (alunoId) {
      userId = alunoId;
      cargo = 'ALUNO';
      where = { alunoId }
    } else {
      throw new BadRequestException('Pelo menos um parâmetro de query deve ser enviado.');
    }

    const existing = await this.usuariosService.findOne(userId, instituicaoId);

    if (existing.cargo !== cargo) {
      throw new ForbiddenException('Os ids precisam ser de usuários do tipo: resposavel e aluno.');
    }

    const list = await this.alunosResponsavelRepository.findAll(where);
    return list
  }

  async findOne(relacaoDto: RelacaoDto): Promise<AlunosResponsavel> {
    const existingRelation = await this.alunosResponsavelRepository.findOne({
      where: { alunoId_responsavelId: {
        alunoId: relacaoDto.alunoId,
        responsavelId: relacaoDto.responsavelId
      }}
    });

    if (!existingRelation) throw new NotFoundException('Relação entre responsavel e aluno não encontrada.');
    return existingRelation;
  }

  async relationExists(relacaoDto: RelacaoDto): Promise<boolean> {
    const existingRelation = await this.alunosResponsavelRepository.findOne({
      where: {
        alunoId_responsavelId: {
          alunoId: relacaoDto.alunoId,
          responsavelId: relacaoDto.responsavelId,
        },
      },
    });

    return !!existingRelation;
  }

  async remove(relacaoDto: RelacaoDto): Promise<AlunosResponsavel> {
    // Verifica se a relação existe
    await this.findOne(relacaoDto);

    const deletedRelation = await this.alunosResponsavelRepository.delete({
      where: { alunoId_responsavelId: {
        alunoId: relacaoDto.alunoId,
        responsavelId: relacaoDto.responsavelId
      }}
    });

    return deletedRelation
  }
}