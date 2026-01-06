import { RespostasService } from '../respostas/respostas.service';
import { PostsService } from '../../posts.service';
import { UsuariosService } from '../../../usuarios/usuarios.service';
import { ComunidadesService } from './../../../comunidades/comunidades.service';
import { FeedsService } from './../../../feeds/feeds.service';
import { CurtidaDto } from './dto/curtida.dto';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CurtidasRepository } from './curtidas.repository';
import { Curtida } from '@prisma/client';

@Injectable()
export class CurtidasService {
  constructor(
    private readonly curtidasRepository: CurtidasRepository,
    private readonly usuariosService: UsuariosService,
    private readonly postsService: PostsService,
    private readonly respostasService: RespostasService,
    private readonly comunidadesService: ComunidadesService,
    private readonly feedsService: FeedsService
  ) {}

  async like(createCurtidaDto: CurtidaDto, instituicaoId: string): Promise<void> {
    const { userId, postId, respostaId, comunidadeId, feedId } = createCurtidaDto;

    // Verifica se o usuário existe
    await this.usuariosService.findOne(userId, instituicaoId);

    // Verifica a existência da comunidade ou feed 
    if (!comunidadeId && !feedId) {
      throw new BadRequestException('Resposta deve estar vinculado a uma comunidade ou feed.');
    }

    if (comunidadeId && feedId) {
      throw new BadRequestException('Resposta deve ter só um vínculo: comunidade ou feed.');
    }

    if (comunidadeId) await this.comunidadesService.findOne(comunidadeId, instituicaoId);
    if (feedId) await this.feedsService.findOne(feedId, instituicaoId);

    // Verifica a exitência de post ou resposta
    if (postId && respostaId) {
      throw new BadRequestException('Curtida deve ter só um vínculo: post ou resposta.');
    }

    let where: any;
    if (postId) {
      await this.postsService.findOne(postId, instituicaoId);
      where = { userId_postId: { userId, postId }, instituicaoId };
    } else if (respostaId) {
      await this.respostasService.findOne(respostaId, instituicaoId);
      where = { userId_respostaId: { userId, respostaId }, instituicaoId };
    } else {
      throw new BadRequestException('Curtida deve estar vinculada a um post ou resposta.');
    }

    const isLiked = await this.curtidasRepository.findOne({ where });
    if (isLiked) {
      throw new ForbiddenException('Um usuário só pode dar uma curtida por conteúdo.');
    }

    await this.curtidasRepository.create({
      data: {
        userId: createCurtidaDto.userId,
        postId: createCurtidaDto.postId ?? null,
        respostaId: createCurtidaDto.respostaId ?? null,
        instituicaoId
      }
    });
  }

  async unlike(removeCurtidaDto: CurtidaDto, instituicaoId: string): Promise<void> {
    const { userId, postId, respostaId } = removeCurtidaDto;

    // Verifica se o usuário existe
    await this.usuariosService.findOne(userId, instituicaoId);

    if (postId && respostaId) {
      throw new BadRequestException('Não é possível dar dislike em um post e resposta ao mesmo tempo.')
    }

    let where: any;
    if (postId) {
      await this.postsService.findOne(postId, instituicaoId);
      where = { userId_postId: { userId, postId }, instituicaoId };
    } else if (respostaId) {
      await this.respostasService.findOne(respostaId, instituicaoId);
      where = { userId_respostaId: { userId, respostaId }, instituicaoId };
    } else {
      throw new BadRequestException('Dislike deve estar vinculado a um post ou resposta');
    }

    const isLiked = await this.curtidasRepository.findOne({ where });

    if (!isLiked) {
      throw new ForbiddenException('Não é possível dar dislike em um conteúdo não possui like.');
    }

    await this.curtidasRepository.delete({ where })
  }

  async getLikes(instituicaoId: string, postId?: string, respostaId?: string): Promise<{ likes: Curtida[], totalLikes: number }> {
    if (postId && respostaId) {
      throw new BadRequestException('Apenas um parâmetro de query pode ser usado por vez.');
    }

    let args: any;
    if (postId) {
      await this.postsService.findOne(postId, instituicaoId);
      args = { where: { postId, instituicaoId }, include: { usuarios: true } };
    } else if (respostaId) {
      await this.respostasService.findOne(respostaId, instituicaoId);
      args = { where: { respostaId, instituicaoId }, include: { usuarios: true } };
    } else {
      throw new BadRequestException('Pelo menos um parâmetro de query deve ser enviado.');
    }

    const [likes, totalLikes] = await Promise.all([
      this.curtidasRepository.findAll(args),
      this.curtidasRepository.count({ where: args.where }),
    ]);

    return { likes, totalLikes }
  }
}