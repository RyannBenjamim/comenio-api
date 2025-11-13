import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Cargo } from '@prisma/client';

@Injectable()
export class TeacherGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Acesso negado: usuário não autenticado.');
    }

    if (user.role !== Cargo.PROFESSOR) {
      throw new ForbiddenException('Acesso negado: usuário não tem permissões de professor.');
    }

    return true;
  }
}