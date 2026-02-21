import { FeedsService } from '../../../feeds/feeds.service';
import { ComunidadesService } from '../../../comunidades/comunidades.service';
import { FirebaseService } from '../../../../../common/firebase/firebase.service';
import { PrismaService } from '../../../../../common/database/prisma.service';
import { PostsService } from '../posts/posts.service';
import { UsuariosService } from '../../../usuarios/usuarios.service';
import { RespostaWithIncludes, respostaIncludes } from '../../utils/respostas.includes';
import { canAccessFeed, canAccessComunidade } from '../../../../../common/utils/accessControl';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { FILE_PRESETS } from '../../../../../common/storage/file-presets';
import { safeDeleteFile } from '../../../../../common/storage/save-delete-file';
import { resolvePostContext, resolveRespostaContext } from '../../utils/resolveSocialContext';
import { saveFile } from '../../../../../common/storage/saveFile';
import { RespostasRepository } from './respostas.repository';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { UpdateRespostaDto } from './dto/update-resposta.dto';
import { Cargo, Resposta } from '@prisma/client';
import { randomUUID } from 'crypto';
import path from 'path';
import { RespostaResponseDto } from './dto/resposta-response.dto';
import { toRespostaDto } from '../../utils/respostas.mapper';

@Injectable()
export class RespostasService {
  constructor(
    private readonly respostasRepository: RespostasRepository,
    private readonly usuariosService: UsuariosService,
    private readonly postsService: PostsService,
    private readonly comunidadesService: ComunidadesService,
    private readonly feedsService: FeedsService,
    private readonly firebaseService: FirebaseService,
    private readonly prisma: PrismaService
  ) {}

  async create(
    createRespostaDto: CreateRespostaDto, 
    user: { id: string, role: Cargo, instituicaoId: string },
    file?: Express.Multer.File
  ): Promise<Resposta> {
    const { postId, respostaId } = createRespostaDto;

    let comunidadeId: string | null = null;
    let feedId: string | null = null;

    // Verifica se o usuário existe
    await this.usuariosService.findOne(user.id, user.instituicaoId);

    if (!postId && !respostaId) {
      throw new BadRequestException('Resposta deve estar vinculada a um post ou resposta.');
    }
    
    if (postId && respostaId) {
      throw new BadRequestException('Resposta deve ter só um vínculo: post ou resposta.');
    }
    
    if (postId) {
      const response = await resolvePostContext(
        this.prisma,
        postId,
        user.instituicaoId
      )

      if (!response) throw new NotFoundException('Post não encontrado.');

      comunidadeId = response.comunidadeId ? response.comunidadeId : null;
      feedId = response.feedId ? response.feedId : null;
    }

    if (respostaId) {
      const response = await resolveRespostaContext(
        this.prisma,
        respostaId,
        user.instituicaoId
      )

      if (!response) throw new NotFoundException('Resposta não encontrada.');

      comunidadeId = response.comunidadeId ? response.comunidadeId : null;
      feedId = response.feedId ? response.feedId : null;
    }

    if (comunidadeId) {
      await this.comunidadesService.findOne(comunidadeId, user.instituicaoId);
      const isMember = await canAccessComunidade(
        this.prisma,
        comunidadeId,
        user.instituicaoId,
        user,
      );
      if (!isMember) throw new ForbiddenException('Você não pertence a esta comunidade.');
    }
    
    if (feedId) {
      await this.feedsService.findOne(feedId, user.instituicaoId);
      const isMember = await canAccessFeed(
        this.prisma,
        feedId,
        user.instituicaoId,
        user.role,
      );
      if (!isMember) throw new ForbiddenException('Você não tem acesso a este feed.');
    }

    let fotoUrl: string | null = null;
    let fotoCaminho: string | null = null;
    
    const uuid = randomUUID();
    
    const ext = file ? path.extname(file.originalname).toLowerCase() : null;
    const filePath = `instituicoes/${user.instituicaoId}/usuarios/${user.id}/respostas/resposta-${uuid}${ext}`;
    
    try {
      const response = await saveFile(
        this.firebaseService,
        filePath,
        file,
        FILE_PRESETS.IMAGE,
      );
      
      fotoCaminho = response ? response.filePath : null;
      fotoUrl = response ? response.fileUrl : null

      const createdResposta = await this.respostasRepository.create({
        data: {
          conteudo: createRespostaDto.conteudo,
          fotoCaminho: fotoCaminho ?? null,
          fotoUrl: fotoUrl ?? null, 
          userId: user.id,
          postId: postId ?? null,
          respostaId: respostaId ?? null,
          feedId: feedId ?? null,
          comunidadeId: comunidadeId ?? null,
          instituicaoId: user.instituicaoId
        }
      });

      return createdResposta;
    } catch(error) {
      if (fotoCaminho) {
        await safeDeleteFile(this.firebaseService, fotoCaminho, 3);
      }
      throw error
    }
  }

  async findAll(instituicaoId: string, postId?: string, respostaId?: string): Promise<RespostaResponseDto[]> {
    if (!postId && !respostaId) {
      throw new BadRequestException('Pelo menos um parâmetro de query deve ser enviado.');
    }

    if (postId && respostaId) {
      throw new BadRequestException('Apenas um parâmetro de query pode ser usado por vez.');
    }


    const list = await this.respostasRepository.findAll({
      where: {
        instituicaoId,
        ...(postId ? { postId } : { respostaId }),
      },
      include: respostaIncludes,
      orderBy: { createdAt: 'desc' }
    }) as RespostaWithIncludes[];

    return list.map(toRespostaDto);
  }

  async findAllByUserId(userId: string, instituicaoId: string): Promise<RespostaResponseDto[]> {
    // Verifica se o usuário existe
    await this.usuariosService.findOne(userId, instituicaoId);

    const list = await this.respostasRepository.findAll({
      where: {
        userId,
        instituicaoId,
      },
      include: respostaIncludes,
      orderBy: { createdAt: 'desc' }
    }) as RespostaWithIncludes[];

    return list.map(toRespostaDto);
  }

  async findOne(id: string, instituicaoId: string): Promise<RespostaResponseDto> {
    const existingResposta = await this.respostasRepository.findOne({ 
      where: { id, instituicaoId },
      include: respostaIncludes
    }) as RespostaWithIncludes;

    if (!existingResposta) throw new NotFoundException('Resposta não encontrada.');
    return toRespostaDto(existingResposta);
  }

  async update(id: string, updateRespostaDto: UpdateRespostaDto, instituicaoId: string): Promise<Resposta> {
    const existingResposta = await this.respostasRepository.findOne({ where: { id, instituicaoId } });
    if (!existingResposta) throw new NotFoundException('Resposta não encontrada.');

    const updated = await this.respostasRepository.update({
      where: { id },
      data: updateRespostaDto
    });
    return updated;
  }

  async remove(id: string, instituicaoId: string): Promise<Resposta> {
    const existingResposta = await this.respostasRepository.findOne({ where: { id, instituicaoId } });
    if (!existingResposta) throw new NotFoundException('Resposta não encontrada.');

    const deletedResposta = await this.respostasRepository.delete({ where: { id } });
    return deletedResposta;
  }
}
