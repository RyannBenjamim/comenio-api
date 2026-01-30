import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../../common/database/prisma.service';
import { AuthenticatedRequest } from '../../../../common/interfaces/AuthenticatedRequest';
import { extractUUID } from '../../../../common/utils/extractUUID';

import {
  resolveAtividadeContext,
  resolveResolucaoContext,
} from '../utils/resolveAvaliativoContext';

@Injectable()
export class AvaliativoContextResolverGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = req.user;

    req.context ??= {};

    const comunidadeId =
      extractUUID(req.body?.comunidadeId) ??
      extractUUID(req.params?.comunidadeId) ??
      extractUUID(req.query?.comunidadeId);

    if (comunidadeId) {
      req.context.comunidadeId = comunidadeId;
      return true;
    }

    const atividadeId =
      extractUUID(req.body?.atividadeId) ??
      extractUUID(req.params?.atividadeId) ??
      extractUUID(req.query?.atividadeId);

    const resolucaoId =
      extractUUID(req.body?.resolucaoId) ??
      extractUUID(req.params?.resolucaoId) ??
      extractUUID(req.query?.resolucaoId);

    const ids = [atividadeId, resolucaoId].filter(Boolean);

    if (ids.length === 0) {
      throw new BadRequestException('Nenhum identificador avaliativo foi enviado.');
    }

    if (ids.length > 1) {
      throw new BadRequestException('Informe apenas um identificador por vez.');
    }

    if (atividadeId) {
      const contextData = await resolveAtividadeContext(
        this.prisma,
        atividadeId,
        user.instituicaoId,
      );

      if (!contextData) {
        throw new NotFoundException('Atividade não encontrada.');
      }

      req.context.comunidadeId = contextData.comunidadeId ?? undefined;
      return true;
    }

    if (resolucaoId) {
      const contextData = await resolveResolucaoContext(
        this.prisma,
        resolucaoId,
        user.instituicaoId,
      );

      if (!contextData) {
        throw new NotFoundException('Resolução não encontrada.');
      }

      req.context.comunidadeId = contextData.comunidadeId ?? undefined;
      return true;
    }

    throw new BadRequestException('Não foi possível resolver o contexto avaliativo.');
  }
}
