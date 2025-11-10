import { ComunidadesService } from './../comunidades/comunidades.service';
import { FeedsService } from './../feeds/feeds.service';
import { UsuariosService } from './../usuarios/usuarios.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usuariosService: UsuariosService,
    private readonly feedsService: FeedsService,
    private readonly comunidadesService: ComunidadesService
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { userId, comunidadeId, feedId } = createPostDto;

    // Verifica se o usuário existe
    await this.usuariosService.findOne(userId);

    if (!comunidadeId && !feedId) {
      throw new BadRequestException('Post deve estar vinculado a uma comunidade ou feed.');
    }

    if (comunidadeId && feedId) {
      throw new BadRequestException('Post deve ter só um vínculo: comunidade ou feed.');
    }

    if (comunidadeId) await this.comunidadesService.findOne(comunidadeId);
    if (feedId) await this.feedsService.findOne(feedId);

    const createdPost = await this.postsRepository.create({ data: createPostDto });
    return createdPost;
  }

  async findAll(comunidadeId?: string, feedId?: string): Promise<Post[]> {
    if (!comunidadeId && !feedId) {
      throw new BadRequestException('Pelo menos um parâmetro de query deve ser enviado.')
    }

    if (comunidadeId && feedId) {
      throw new BadRequestException('Apenas um parâmetro de query pode ser usado por vez.')
    }

    const args = comunidadeId ? { where: { comunidadeId } } : { where: { feedId } };

    const list = await this.postsRepository.findAll(args);
    return list;
  }

  async findOne(id: string): Promise<Post> {
    const existingPost = await this.postsRepository.findOne({ where: { id } });
    if (!existingPost) throw new NotFoundException('Post não encontrado.');
    return existingPost;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const existingPost = await this.postsRepository.findOne({ where: { id } });
    if (!existingPost) throw new NotFoundException('Post não encontrado.');

    const updated = await this.postsRepository.update({
      where: { id },
      data: updatePostDto
    });
    return updated;
  }

  async remove(id: string): Promise<Post> {
    const existingPost = await this.postsRepository.findOne({ where: { id } });
    if (!existingPost) throw new NotFoundException('Post não encontrado.');

    const deletedPost = await this.postsRepository.delete({ where: { id } });
    return deletedPost;
  }
}
