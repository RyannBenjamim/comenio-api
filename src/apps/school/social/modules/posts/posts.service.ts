import { ComunidadesService } from '../../../comunidades/comunidades.service';
import { PrismaService } from '../../../../../common/database/prisma.service';
import { FeedsService } from '../../../feeds/feeds.service';
import { UsuariosService } from '../../../usuarios/usuarios.service';
import { FirebaseService } from '../../../../../common/firebase/firebase.service';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { canAccessFeed, canAccessComunidade } from '../../../../../common/utils/accessControl';
import { safeDeleteFile } from '../../../../../common/storage/save-delete-file';
import { saveFile } from '../../../../../common/storage/saveFile';
import { FILE_PRESETS } from '../../../../../common/storage/file-presets';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Cargo, Post, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import path from 'path';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usuariosService: UsuariosService,
    private readonly feedsService: FeedsService,
    private readonly comunidadesService: ComunidadesService,
    private readonly firebaseService: FirebaseService,
    private readonly prisma: PrismaService
  ) {}

  async create(
    userId: string, 
    createPostDto: CreatePostDto, 
    instituicaoId: string, 
    user: { id: string, role: Cargo },
    file?: Express.Multer.File
  ): Promise<Post> {
    const { comunidadeId, feedId } = createPostDto;

    // Verifica se o usuário existe
    await this.usuariosService.findOne(userId, instituicaoId);

    if (!comunidadeId && !feedId) {
      throw new BadRequestException('Post deve estar vinculado a uma comunidade ou feed.');
    }

    if (comunidadeId && feedId) {
      throw new BadRequestException('Post deve ter só um vínculo: comunidade ou feed.');
    }

    if (comunidadeId) {
      await this.comunidadesService.findOne(comunidadeId, instituicaoId);
      const isMember = await canAccessComunidade(
        this.prisma,
        comunidadeId,
        instituicaoId,
        user,
      );
      if (!isMember) throw new ForbiddenException('Você não pertence a esta comunidade.');
    }

    if (feedId) {
      await this.feedsService.findOne(feedId, instituicaoId);
      const isMember = await canAccessFeed(
        this.prisma,
        feedId,
        instituicaoId,
        user.role,
      );
      if (!isMember) throw new ForbiddenException('Você não tem acesso a este feed.');
    }

    let fotoUrl: string | null = null;
    let fotoCaminho: string | null = null;

    const uuid = randomUUID();

    const ext = file ? path.extname(file.originalname).toLowerCase() : null;
    const filePath = `instituicoes/${instituicaoId}/usuarios/${userId}/posts/post-${uuid}${ext}`;

    try {
      const response = await saveFile(
        this.firebaseService,
        filePath,
        file,
        FILE_PRESETS.IMAGE,
      );

      fotoCaminho = response ? response.filePath : null;
      fotoUrl = response ? response.fileUrl : null

      const createdPost = await this.postsRepository.create({
        data: {
          conteudo: createPostDto.conteudo,
          fotoCaminho: fotoCaminho ?? null,
          fotoUrl: fotoUrl ?? null, 
          userId,
          feedId: feedId ?? null,
          comunidadeId: comunidadeId ?? null,
          instituicaoId,
        },
      });

      return createdPost;
    } catch (error) {
      if (fotoCaminho) {
        await safeDeleteFile(this.firebaseService, fotoCaminho, 3);
      }
      throw error
    }
  }

  private buildFindPostsArgs(
    instituicaoId: string,
    where: Prisma.PostWhereInput
  ): Prisma.PostFindManyArgs {
    return {
      where: {
        instituicaoId,
        ...where
      },
      include: {
        user: {
          select: {
            primeiroNome: true,
            nickname: true,
            fotoPerfilUrl: true,
          },
        },
        comunidade: { 
          select: { id: true, titulo: true } 
        },
        feed: { 
          select: { id: true, titulo: true } 
        }
      },
      orderBy: { createdAt: 'desc' }
    };
  }

  // Retorna todos os posts de um feed ou comunidade
  async findAll(
    instituicaoId: string,
    comunidadeId?: string,
    feedId?: string
  ): Promise<Post[]> {

    if (!comunidadeId && !feedId) {
      throw new BadRequestException('Pelo menos um parâmetro deve ser enviado.')
    }

    if (comunidadeId && feedId) {
      throw new BadRequestException('Apenas um parâmetro pode ser usado.')
    }

    const where: Prisma.PostWhereInput =
      comunidadeId ? { comunidadeId } : { feedId };

    const args = this.buildFindPostsArgs(instituicaoId, where);
    const list = await this.postsRepository.findAll(args);
    return list
  }

  // Retorna todos os posts do feed e comunidades do usuário
  async findAllMergedPosts(
    instituicaoId: string,
    user: { id: string; role: Cargo }
  ): Promise<Post[]> {

    const comunidades = await this.comunidadesService.getStudentCommunities(
      user.id,
      instituicaoId
    );

    const comunidadesIds = comunidades.map(c => c.id);

    if (comunidadesIds.length === 0) return [];

    const args = this.buildFindPostsArgs(instituicaoId, {
      comunidadeId: { in: comunidadesIds },
    });

    const list = await this.postsRepository.findAll(args);
    return list;
  }

  // Retorna a lista completa dos posts do usuário
  async findUserPostsForFeed(
    instituicaoId: string,
    userId: string
  ): Promise<Post[]> {
    const args = this.buildFindPostsArgs(instituicaoId, { userId });
    const list = await this.postsRepository.findAll(args);
    return list
  }

  // Retorna apenas as fotos e id dos posts do usuário
  async findUserPostsForGrid(
    instituicaoId: string,
    userId: string
  ): Promise<Pick<Post, 'id' | 'fotoUrl'>[]> {
    const list = await this.postsRepository.findAll({
      where: {
        instituicaoId,
        userId
      },
      select: {
        id: true,
        fotoUrl: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return list;
  }

  // Retorna a lista completa dos posts de um usuário específico
  async findUserProfilePostsForFeed(
    instituicaoId: string,
    viewerId: string,
    profileUserId: string
  ): Promise<Post[]> {

    const comunidades = await this.comunidadesService.getStudentCommunities(
      viewerId,
      instituicaoId
    );

    const comunidadesIds = comunidades.map(c => c.id);

    if (comunidadesIds.length === 0) return [];

    const args = this.buildFindPostsArgs(instituicaoId, {
      userId: profileUserId,
      comunidadeId: { in: comunidadesIds },
    });

    const list = await this.postsRepository.findAll(args);
    return list;
  }

  // Retorna apenas as fotos e id dos posts de um usuário específico
  async findUserProfilePostsForGrid(
    instituicaoId: string,
    viewerId: string,
    profileUserId: string
  ): Promise<Pick<Post, 'id' | 'fotoUrl'>[]> {

    const comunidades = await this.comunidadesService.getStudentCommunities(
      viewerId,
      instituicaoId
    );

    const comunidadesIds = comunidades.map(c => c.id);

    if (comunidadesIds.length === 0) return [];

    const list = await this.postsRepository.findAll({
      where: {
        instituicaoId,
        userId: profileUserId,
        comunidadeId: { in: comunidadesIds }
      },
      select: {
        id: true,
        fotoUrl: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return list;
  }

  async findOne(id: string, instituicaoId: string): Promise<Post> {
    const existingPost = await this.postsRepository.findOne({ 
      where: { id, instituicaoId },
      include: {
        user: {
          select: {
            primeiroNome: true,
            nickname: true,
            fotoPerfilUrl: true,
          },
        },
      },
    });
    
    if (!existingPost) throw new NotFoundException('Post não encontrado.');
    return existingPost;
  }

  async update(id: string, updatePostDto: UpdatePostDto, instituicaoId: string): Promise<Post> {
    const existingPost = await this.postsRepository.findOne({ where: { id, instituicaoId } });
    if (!existingPost) throw new NotFoundException('Post não encontrado.');

    const updated = await this.postsRepository.update({
      where: { id },
      data: updatePostDto
    });
    return updated;
  }

  async remove(id: string, instituicaoId: string): Promise<Post> {
    const existingPost = await this.postsRepository.findOne({ where: { id, instituicaoId } });
    if (!existingPost) throw new NotFoundException('Post não encontrado.');

    const deletedPost = await this.postsRepository.delete({ where: { id } });
    return deletedPost;
  }
}
