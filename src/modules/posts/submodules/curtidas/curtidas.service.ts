import { RespostasService } from './../respostas/respostas.service';
import { PostsService } from './../../posts.service';
import { UsuariosService } from './../../../usuarios/usuarios.service';
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
    private readonly respostasService: RespostasService
  ) {}

  async like(createCurtidaDto: CurtidaDto): Promise<void> {
    const { userId, postId, respostaId } = createCurtidaDto;

    // Verifica se o usuário existe
    await this.usuariosService.findOne(userId);

    if (postId && respostaId) {
      throw new BadRequestException('Curtida deve ter só um vínculo: post ou resposta.');
    }

    let where: any;
    if (postId) {
      await this.postsService.findOne(postId);
      where = { userId_postId: { userId, postId } };
    } else if (respostaId) {
      await this.respostasService.findOne(respostaId);
      where = { userId_respostaId: { userId, respostaId } };
    } else {
      throw new BadRequestException('Curtida deve estar vinculada a um post ou resposta.');
    }

    const isLiked = await this.curtidasRepository.findOne({ where });
    if (isLiked) {
      throw new ForbiddenException('Um usuário só pode dar uma curtida por conteúdo.');
    }

    await this.curtidasRepository.create({ data: createCurtidaDto });
  }

  async unlike(removeCurtidaDto: CurtidaDto): Promise<void> {
    const { userId, postId, respostaId } = removeCurtidaDto;

    // Verifica se o usuário existe
    await this.usuariosService.findOne(userId);

    if (postId && respostaId) {
      throw new BadRequestException('Não é possível dar dislike em um post e resposta ao mesmo tempo.')
    }

    let where: any;
    if (postId) {
      await this.postsService.findOne(postId);
      where = { userId_postId: { userId, postId } };
    } else if (respostaId) {
      await this.respostasService.findOne(respostaId);
      where = { userId_respostaId: { userId, respostaId } };
    } else {
      throw new BadRequestException('Dislike deve estar vinculado a um post ou resposta');
    }

    const isLiked = await this.curtidasRepository.findOne({ where });

    if (!isLiked) {
      throw new ForbiddenException('Não é possível dar dislike em um conteúdo não possui like.');
    }

    await this.curtidasRepository.delete({ where })
  }

  async getLikes(postId?: string, respostaId?: string): Promise<{ likes: Curtida[], totalLikes: number }> {
    if (postId && respostaId) {
      throw new BadRequestException('Apenas um parâmetro de query pode ser usado por vez.');
    }

    let args: any;
    if (postId) {
      await this.postsService.findOne(postId);
      args = { where: { postId }, include: { usuarios: true } };
    } else if (respostaId) {
      await this.respostasService.findOne(respostaId);
      args = { where: { respostaId }, include: { usuarios: true } };
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