import { Injectable, NotFoundException } from "@nestjs/common";
import { PostsRepository } from '../../../../apps/school/posts/posts.repository';
import { RespostasRepository } from '../../../../apps/school/posts/submodules/respostas/respostas.repository'
import { CurtidasRepository } from '../../../../apps/school/posts/submodules/curtidas/curtidas.repository';
import { FeedsRepository } from "../../../../apps/school/feeds/feeds.repository";
import { ComunidadesRepository } from "../../../../apps/school/comunidades/comunidades.repository";
import { Cargo } from "@prisma/client";

@Injectable()
export class ContextService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly respostasRepository: RespostasRepository,
    private readonly curtidasRepository: CurtidasRepository,
    private readonly feedsRepository: FeedsRepository,
    private readonly comunidadesRepository: ComunidadesRepository,
  ) {}

  // --------------- RESOLUÇÃO DE CONTEXTO ---------------

  async resolveByPost(postId: string, instituicaoId: string) {
    const data = await this.postsRepository.resolveContext(postId, instituicaoId);
    if (!data) throw new NotFoundException('Post não encontrado.');
    return data;
  }

  async resolveByResposta(respostaId: string, instituicaoId: string) {
    const data = await this.respostasRepository.resolveContext(respostaId, instituicaoId);
    if (!data) throw new NotFoundException('Resposta não encontrada.');
    return data;
  }

  async resolveByCurtida(curtidaId: string, instituicaoId: string) {
    const data = await this.curtidasRepository.resolveContext(curtidaId, instituicaoId);
    if (!data) throw new NotFoundException('Curtida não encontrada.');
    return data;
  }

  // --------------- CONTROLE DE ACESSO ---------------

  async canAccessFeed(feedId: string, instituicaoId: string, userRole: Cargo): Promise<boolean> {
    const feed = await this.feedsRepository.resolveAccessContext(
      feedId,
      instituicaoId,
    );

    if (!feed) throw new NotFoundException('Feed não encontrado.');

    return feed.tipoPerfil === userRole;
  }

  async canAccessComunidade(
    comunidadeId: string,
    instituicaoId: string,
    user: { id: string; role: Cargo },
  ): Promise<boolean> {
    const comunidade = await this.comunidadesRepository.resolveAccessContext(
      comunidadeId,
      instituicaoId,
      user.id,
    );

    if (!comunidade) {
      throw new NotFoundException('Comunidade não encontrada.');
    }

    if (
      user.role === Cargo.PROFESSOR &&
      comunidade.aula.professorId === user.id
    ) {
      return true;
    }

    if (
      user.role === Cargo.ALUNO &&
      comunidade.aula.turma.alunos.length > 0
    ) {
      return true;
    }

    return false;
  }
}

