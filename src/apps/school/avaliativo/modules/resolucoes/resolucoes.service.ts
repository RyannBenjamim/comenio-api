import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../../../../../common/firebase/firebase.service';
import { canAccessComunidade } from '../../../../../common/utils/accessControl';
import { ResolucoesRepository } from './resolucoes.repository';
import { CreateResolucaoDto } from './dto/create-resolucao.dto';
import { UpdateResolucaoDto } from './dto/update-resolucao.dto';
import { Cargo, Resolucao } from '@prisma/client';
import { UsuariosService } from '../../../usuarios/usuarios.service';
import { resolveAtividadeContext } from '../../utils/resolveAvaliativoContext';
import { PrismaService } from '../../../../../common/database/prisma.service';
import { safeDeleteFile } from '../../../../../common/storage/save-delete-file';
import { saveFile } from '../../../../../common/storage/saveFile';
import { FILE_PRESETS } from '../../../../../common/storage/file-presets';
import { randomUUID } from 'crypto';
import * as path from 'path';

@Injectable()
export class ResolucoesService {
  constructor(
    private readonly resolucoesRepository: ResolucoesRepository,
    private readonly usuariosService: UsuariosService,
    private readonly firebaseService: FirebaseService,
    private readonly prisma: PrismaService
  ) {}

  async create(
    createResolucaoDto: CreateResolucaoDto,
    userId: string,
    instituicaoId: string,
    user: { id: string, role: Cargo },
    file?: Express.Multer.File,
  ): Promise<Resolucao> {
    const contexto = await resolveAtividadeContext(
      this.prisma, 
      createResolucaoDto.atividadeId,
      instituicaoId
    );

    if (!contexto) {
      throw new NotFoundException('Atividade não encontrada.');
    }

    // Verifica se o usuário existe
    const existingAluno = await this.usuariosService.findOne(
      userId,
      instituicaoId,
    );

    // Apenas alunos podem resolver
    if (existingAluno.cargo !== 'ALUNO') {
      throw new ForbiddenException(
        'Apenas alunos podem resolver uma atividade.',
      );
    }

    if (!contexto.comunidadeId) {
      throw new BadRequestException('Atividade não está associada a uma comunidade.');
    }

    const isMember = await canAccessComunidade(
      this.prisma,
      contexto.comunidadeId,
      instituicaoId,
      user,
    );
    if (!isMember) throw new ForbiddenException('Você não pertence a esta comunidade.');

    let pdfCaminho: string | null = null;

    const uuid = randomUUID();

    const ext = file ? path.extname(file.originalname).toLowerCase() : '.pdf';
    const filePath = `instituicoes/${instituicaoId}/atividades/${createResolucaoDto.atividadeId}/resolucoes/aluno-${userId}-${uuid}${ext}`;

    try {
      const response = await saveFile(
        this.firebaseService,
        filePath,
        file,
        FILE_PRESETS.PDF,
      );

      pdfCaminho = response ? response?.filePath : null;

      const createdResolucao = await this.resolucoesRepository.create({
        data: {
          alunoId: userId,
          atividadeId: createResolucaoDto.atividadeId,
          conteudo: createResolucaoDto.conteudo,
          pdfCaminho: pdfCaminho && null,
          instituicaoId,
        },
      });

      return createdResolucao;
    } catch (error) {
      if (pdfCaminho) {
        await safeDeleteFile(this.firebaseService, pdfCaminho, 3);
      }
      throw error;
    }
  }

  async findAll(instituicaoId: string): Promise<Resolucao[]> {
    const resolucoes = await this.resolucoesRepository.findAll({ where: { instituicaoId } });
    return resolucoes;
  }

  async findOne(id: string, instituicaoId: string): Promise<Resolucao> {
    const existingResolucao = await this.resolucoesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingResolucao) throw new NotFoundException('Resolução não encontrada.');
    return existingResolucao;
  }

  async update(id: string, updateResolucaoDto: UpdateResolucaoDto, instituicaoId: string): Promise<Resolucao> {
    const existingResolucao = await this.resolucoesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingResolucao) throw new NotFoundException('Resolução não encontrada.');

    const updatedResolucao = await this.resolucoesRepository.update({
      where: { id },
      data: updateResolucaoDto
    });
    return updatedResolucao;
  }

  async remove(id: string, instituicaoId: string): Promise<Resolucao> {
    const existingResolucao = await this.resolucoesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingResolucao) throw new NotFoundException('Resolução não encontrada.');

    const deletedResolucao = await this.resolucoesRepository.delete({ where: { id } });
    return deletedResolucao;
  }
}