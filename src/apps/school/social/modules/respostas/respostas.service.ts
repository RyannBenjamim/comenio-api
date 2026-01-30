import { FeedsService } from '../../../feeds/feeds.service';
import { ComunidadesService } from '../../../comunidades/comunidades.service';
import { PostsService } from '../posts/posts.service';
import { UsuariosService } from '../../../usuarios/usuarios.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RespostasRepository } from './respostas.repository';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { UpdateRespostaDto } from './dto/update-resposta.dto';
import { Prisma, Resposta } from '@prisma/client';

interface Context {
  comunidadeId?: string,
  feedId?: string
}

@Injectable()
export class RespostasService {
  constructor(
    private readonly respostasRepository: RespostasRepository,
    private readonly usuariosService: UsuariosService,
    private readonly postsService: PostsService,
    private readonly comunidadesService: ComunidadesService,
    private readonly feedsService: FeedsService
  ) {}

  async create(createRespostaDto: CreateRespostaDto, context: Context, instituicaoId: string): Promise<Resposta> {
    const { userId, postId, respostaId } = createRespostaDto;

    // Verifica se o usuário existe
    await this.usuariosService.findOne(userId, instituicaoId);

    // Verifica a existência da comunidade ou feed 
    if (!context.comunidadeId && !context.feedId) {
      throw new BadRequestException('Resposta deve estar vinculado a uma comunidade ou feed.');
    }

    if (context.comunidadeId && context.feedId) {
      throw new BadRequestException('Resposta deve ter só um vínculo: comunidade ou feed.');
    }

    if (context.comunidadeId) await this.comunidadesService.findOne(context.comunidadeId, instituicaoId);
    if (context.feedId) await this.feedsService.findOne(context.feedId, instituicaoId);

    // Verifica a existência do post ou resposta
    if (!postId && !respostaId) {
      throw new BadRequestException('Resposta deve estar vinculada a um post ou resposta.');
    }
    
    if (postId && respostaId) {
      throw new BadRequestException('Resposta deve ter só um vínculo: post ou resposta.');
    }
    
    if (postId) await this.postsService.findOne(postId, instituicaoId);
    if (respostaId) await this.findOne(respostaId, instituicaoId);
    
    const createdResposta = await this.respostasRepository.create({
      data: {
        conteudo: createRespostaDto.conteudo,
        fotoCaminho: null,
        fotoUrl: null, 
        userId: createRespostaDto.userId,
        postId: createRespostaDto.postId ?? null,
        respostaId: createRespostaDto.respostaId ?? null,
        feedId: context.feedId ?? null,
        comunidadeId: context.comunidadeId ?? null,
        instituicaoId
      }
    });
    return createdResposta;
  }

  async findAll(instituicaoId: string, postId?: string, respostaId?: string): Promise<Resposta[]> {
    if (!postId && !respostaId) {
      throw new BadRequestException('Pelo menos um parâmetro de query deve ser enviado.');
    }

    if (postId && respostaId) {
      throw new BadRequestException('Apenas um parâmetro de query pode ser usado por vez.');
    }

    const args: Prisma.RespostaFindManyArgs = {
      where: {
        instituicaoId,
        ...(postId ? { postId } : { respostaId }),
      },
      include: {
        user: {
          select: {
            primeiroNome: true,
            nickname: true,
            fotoPerfilUrl: true,
          },
        },
      },
    };

    const list = await this.respostasRepository.findAll(args);
    return list;
  }

  async findOne(id: string, instituicaoId: string): Promise<Resposta> {
    const existingResposta = await this.respostasRepository.findOne({ 
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
    if (!existingResposta) throw new NotFoundException('Resposta não encontrada.');
    return existingResposta;
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
