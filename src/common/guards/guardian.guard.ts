import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Cargo } from '@prisma/client';

@Injectable()
export class GuardianGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Acesso negado: usuário não autenticado.');
    }

    if (user.role !== Cargo.RESPONSAVEL) {
      throw new ForbiddenException('Acesso negado: usuário não tem permissão de responsável.');
    }

    return true;
  }
}