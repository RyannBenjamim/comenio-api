import { ComunidadesService } from '../comunidades/comunidades.service';
import { FeedsService } from '../feeds/feeds.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { FirebaseService } from '../../../common/firebase/firebase.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '@prisma/client';
import { randomUUID } from 'crypto';
import path from 'path';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usuariosService: UsuariosService,
    private readonly feedsService: FeedsService,
    private readonly comunidadesService: ComunidadesService,
    private readonly firebaseService: FirebaseService
  ) {}

  async create(createPostDto: CreatePostDto, instituicaoId: string, file: Express.Multer.File): Promise<Post> {
    const { userId, comunidadeId, feedId } = createPostDto;

    // Verifica se o usuário existe
    await this.usuariosService.findOne(userId, instituicaoId);

    if (!comunidadeId && !feedId) {
      throw new BadRequestException('Post deve estar vinculado a uma comunidade ou feed.');
    }

    if (comunidadeId && feedId) {
      throw new BadRequestException('Post deve ter só um vínculo: comunidade ou feed.');
    }

    if (comunidadeId) await this.comunidadesService.findOne(comunidadeId, instituicaoId);
    if (feedId) await this.feedsService.findOne(feedId, instituicaoId);

    let fotoUrl: string | null = null;
    let fotoCaminho: string | null = null;

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

      if (!allowedTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          'Formato de imagem não suportado. Use JPG, PNG ou WEBP.',
        );
      }

      const ext = path.extname(file.originalname).toLowerCase();
      const uuid = randomUUID();

      const fotoCaminho = `instituicoes/${instituicaoId}/usuarios/${userId}/posts/post-${uuid}${ext}`;

      fotoUrl = await this.firebaseService.uploadFile(
        fotoCaminho,
        file.buffer,
        file.mimetype,
      );
    }

    const createdPost = await this.postsRepository.create({
      data: {
        titulo: createPostDto.titulo,
        conteudo: createPostDto.conteudo,
        fotoCaminho: fotoCaminho ?? null,
        fotoUrl: fotoCaminho ?? null, 
        userId,
        feedId: feedId ?? null,
        comunidadeId: comunidadeId ?? null,
        instituicaoId,
      },
    });

    return createdPost;
  }

  async findAll(instituicaoId: string, comunidadeId?: string, feedId?: string): Promise<Post[]> {
    if (!comunidadeId && !feedId) {
      throw new BadRequestException('Pelo menos um parâmetro de query deve ser enviado.')
    }

    if (comunidadeId && feedId) {
      throw new BadRequestException('Apenas um parâmetro de query pode ser usado por vez.')
    }

    const args = comunidadeId ? { where: { comunidadeId, instituicaoId } } : { where: { feedId, instituicaoId } };

    const list = await this.postsRepository.findAll(args);
    return list;
  }

  async findOne(id: string, instituicaoId: string): Promise<Post> {
    const existingPost = await this.postsRepository.findOne({ where: { id, instituicaoId } });
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
