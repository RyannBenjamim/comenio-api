import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthenticatedRequest } from '../../../../common/interfaces/AuthenticatedRequest';
import { Cargo } from '@prisma/client';
import { ContextService } from './context.service';

@Injectable()
export class ContextAccessGuard implements CanActivate {
  constructor(private readonly contextService: ContextService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = req.user;

    const { feedId, comunidadeId } = req.context ?? {};

    if (!feedId && !comunidadeId) {
      throw new BadRequestException('Contexto não informado.');
    }

    if (
      user.role === Cargo.ADMIN ||
      user.role === Cargo.MODERADOR
    ) {
      return true;
    }

    if (feedId) {
      const allowed = await this.contextService.canAccessFeed(
        feedId,
        user.instituicaoId,
        user.role,
      );

      if (!allowed) {
        throw new ForbiddenException('Você não tem acesso a este feed.');
      }

      return true;
    }

    if (comunidadeId) {
      const allowed = await this.contextService.canAccessComunidade(
        comunidadeId,
        user.instituicaoId,
        user,
      );

      if (!allowed) {
        throw new ForbiddenException('Você não pertence a esta comunidade.');
      }

      return true;
    }

    return false;
  }
}

