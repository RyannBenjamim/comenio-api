import { SuperadminRepository } from '../../apps/admin/superadmin/superadmin.repository';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UsuariosRepository } from '../../apps/school/usuarios/usuarios.repository'; 
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuariosRepository: UsuariosRepository,
    private readonly superadminRepository: SuperadminRepository,
    private readonly reflector: Reflector,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Acesso negado, um token de autorização é obrigatório.');
    }

    try {
      const payload = this.jwtService.verify(token);

      let existingUser: any;

      if (payload.role === 'SUPERADMIN') {
        existingUser = await this.superadminRepository.findOne({ where: { id: payload.id } });
      } else {
        existingUser = await this.usuariosRepository.findOne({ id: payload.id });
      }

      if (!existingUser) {
        throw new UnauthorizedException('Token de usuário inválido.');
      }

      request['user'] = payload;
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado');
      }

      throw new UnauthorizedException('Token inválido');
    }
  }
}