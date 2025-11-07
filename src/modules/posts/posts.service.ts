import { ComunidadesService } from './../comunidades/comunidades.service';
import { FeedsService } from './../feeds/feeds.service';
import { UsuariosService } from './../usuarios/usuarios.service';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
    // Verifica se o usuário existe
    await this.usuariosService.findOne(createPostDto.userId);

    if (createPostDto.comunidadeId && createPostDto.feedId) {
      throw new ForbiddenException('Post deve ter só um vínculo: comunidade ou feed.');
    }

    if (createPostDto.comunidadeId) {
      await this.comunidadesService.findOne(createPostDto.comunidadeId);
    }

    if (createPostDto.feedId) {
      await this.feedsService.findOne(createPostDto.feedId);
    }

    const createdPost = await this.postsRepository.create({ data: createPostDto });
    return createdPost;
  }

  async findAll(comunidadeId?: string, feedId?: string): Promise<Post[]> {
    if (!comunidadeId && !feedId) {
      throw new ForbiddenException('Pelo menos um parâmetro de query deve ser enviado.')
    }

    if (comunidadeId && feedId) {
      throw new ForbiddenException('Apenas um parâmetro de query pode ser usado por vez.')
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
