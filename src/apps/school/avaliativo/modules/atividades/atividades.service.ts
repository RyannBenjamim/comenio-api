import { UsuariosService } from './../../../usuarios/usuarios.service';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AtividadesRepository } from './atividades.repository';
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import { UpdateAtividadeDto } from './dto/update-atividade.dto';
import { Atividade } from '@prisma/client';
import { ComunidadesService } from '../../../comunidades/comunidades.service';
import { FirebaseService } from '../../../../../common/firebase/firebase.service';
import { safeDeleteFile } from '../../../../../common/storage/save-delete-file';
import { saveFile } from '../../../../../common/storage/saveFile';
import { FILE_PRESETS } from '../../../../../common/storage/file-presets';
import path from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class AtividadesService {
  constructor(
    private readonly atividadesRepository: AtividadesRepository,
    private readonly comunidadesService: ComunidadesService,
    private readonly usuariosService: UsuariosService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(
    createAtividadeDto: CreateAtividadeDto,
    userId: string,
    instituicaoId: string,
    file?: Express.Multer.File
  ): Promise<Atividade> {
    // Verifica se a comunidade existe + professor responsável
    const comunidade = await this.comunidadesService.findOneWithProfessor(
      createAtividadeDto.comunidadeId,
      instituicaoId,
    );

    // Verifica se o professor existe
    const existingProfessor = await this.usuariosService.findOne(
      userId,
      instituicaoId,
    );

    // Verifica se é professor
    if (existingProfessor.cargo !== 'PROFESSOR') {
      throw new ForbiddenException('Apenas professores podem criar uma atividade.');
    }

    // Verifica se o professor é responsável pela comunidade
    if (comunidade.aula.professorId !== userId) {
      throw new ForbiddenException(
        'Você não pode criar uma atividade nessa comunidade.',
      );
    }

    let pdfCaminho: string | null = null;

    const uuid = randomUUID();

    const ext = file ? path.extname(file.originalname).toLowerCase() : '.pdf';
    const filePath = `instituicoes/${instituicaoId}/comunidades/${createAtividadeDto.comunidadeId}/atividades/atividade-${uuid}${ext}`;

    try {
      const response = await saveFile(
        this.firebaseService,
        filePath,
        file,
        FILE_PRESETS.PDF,
      );

      pdfCaminho = response ? response?.filePath : null;

      const createdAtividade = await this.atividadesRepository.create({
        data: {
          titulo: createAtividadeDto.titulo,
          conteudo: createAtividadeDto.conteudo,
          pdfCaminho: pdfCaminho && null,
          dataInicio: createAtividadeDto.dataInicio,
          dataFim: createAtividadeDto.dataFim,
          professorId: userId,
          comunidadeId: createAtividadeDto.comunidadeId,
          instituicaoId,
        },
      });

      return createdAtividade;
    } catch (error) {
      if (pdfCaminho) {
        await safeDeleteFile(this.firebaseService, pdfCaminho, 3);
      }
      throw error;
    }
  }

  async findAll(instituicaoId: string, comunidadeId: string): Promise<Atividade[]> {
    if (!comunidadeId) {
      throw new BadRequestException('Um comunidadeId deve ser enviado como um parâmetro de query.')
    }

    const atividades = await this.atividadesRepository.findAll({ where: { instituicaoId, comunidadeId } });
    return atividades;
  }

  async findOne(id: string, instituicaoId: string): Promise<Atividade> {
    const existingAtividade = await this.atividadesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingAtividade) throw new NotFoundException('Atividade não encontrada.');
    return existingAtividade;
  }

  async update(id: string, updateAtividadeDto: UpdateAtividadeDto, instituicaoId: string): Promise<Atividade> {
    const existingAtividade = await this.atividadesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingAtividade) throw new NotFoundException('Atividade não encontrada.');

    const updatedAtividade = await this.atividadesRepository.update({
      where: { id },
      data: updateAtividadeDto
    });
    return updatedAtividade;
  }

  async remove(id: string, instituicaoId: string): Promise<Atividade> {
    const existingAtividade = await this.atividadesRepository.findOne({ where: { id, instituicaoId } });
    if (!existingAtividade) throw new NotFoundException('Atividade não encontrada.');

    const deletedAtividade = await this.atividadesRepository.delete({ where: { id } });
    return deletedAtividade;
  }
}
