import { PrismaService } from '../database/prisma.service';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import {
  canAccessComunidade,
  canAccessFeed
} from '../utils/accessControl'

import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
import { Cargo } from '@prisma/client';

@Injectable()
export class ContextAccessGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

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
      const allowed = await canAccessFeed(
        this.prisma,
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
      const allowed = await canAccessComunidade(
        this.prisma,
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

