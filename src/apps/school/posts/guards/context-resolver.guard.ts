import { ContextService } from './context.service';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AuthenticatedRequest } from '../../../../common/interfaces/AuthenticatedRequest';
import { extractUUID } from '../../../../common/utils/extractUUID';

@Injectable()
export class ContextResolverGuard implements CanActivate {
  constructor(private readonly contextService: ContextService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = req.user;

    req.context ??= {};

    const feedId =
      extractUUID(req.body?.feedId) ??
      extractUUID(req.params?.feedId) ??
      extractUUID(req.query?.feedId);

    const comunidadeId =
      extractUUID(req.body?.comunidadeId) ??
      extractUUID(req.params?.comunidadeId) ??
      extractUUID(req.query?.comunidadeId);

    if (feedId || comunidadeId) {
      req.context.feedId = feedId;
      req.context.comunidadeId = comunidadeId;
      return true;
    }

    console.log("aqui: " + req.query?.postId)

    const postId =
      extractUUID(req.body?.postId) ??
      extractUUID(req.params?.postId) ??
      extractUUID(req.query?.postId);

    const respostaId =
      extractUUID(req.body?.respostaId) ??
      extractUUID(req.params?.respostaId) ??
      extractUUID(req.query?.respostaId);

    const curtidaId =
      extractUUID(req.body?.curtidaId) ??
      extractUUID(req.params?.curtidaId) ??
      extractUUID(req.query?.curtidaId);

    const ids = [postId, respostaId, curtidaId].filter(Boolean);

    if (ids.length === 0) {
      throw new BadRequestException('Nenhum identificador foi enviado.');
    }

    if (ids.length > 1) {
      throw new BadRequestException('Informe apenas um identificador por vez.');
    }

    if (postId) {
      const contextData = await this.contextService.resolveByPost(
        postId,
        user.instituicaoId,
      );

      if (!contextData) {
        throw new NotFoundException('Post não encontrado.');
      }

      req.context.feedId = contextData.feedId ?? undefined;
      req.context.comunidadeId = contextData.comunidadeId ?? undefined;
      return true;
    }

    if (respostaId) {
      const contextData = await this.contextService.resolveByResposta(
        respostaId,
        user.instituicaoId,
      );

      if (!contextData) {
        throw new NotFoundException('Resposta não encontrada.');
      }

      req.context.feedId = contextData.feedId ?? undefined;
      req.context.comunidadeId = contextData.comunidadeId ?? undefined;
      return true;
    }

    if (curtidaId) {
      const contextData = await this.contextService.resolveByCurtida(
        curtidaId,
        user.instituicaoId,
      );

      if (!contextData) {
        throw new NotFoundException('Curtida não encontrada.');
      }

      req.context.feedId = contextData.feedId ?? undefined;
      req.context.comunidadeId = contextData.comunidadeId ?? undefined;
      return true;
    }

    throw new BadRequestException('Não foi possível resolver o contexto.');
  }
}
