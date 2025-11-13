import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Cargo } from '@prisma/client';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Acesso negado: usuário não autenticado.');
    }

    if (user.role !== Cargo.SUPERADMIN) {
      throw new ForbiddenException('Acesso negado: usuário não tem permissões de superadmin.');
    }

    return true;
  }
}