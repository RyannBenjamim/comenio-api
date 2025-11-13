import { UsuariosRepository } from './../../modules/usuarios/usuarios.repository';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuariosRepository: UsuariosRepository
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [ type, token ] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = this.extractTokenFromHeader(request);
    if (!authorization) throw new UnauthorizedException('Acesso negado, um token de autorização é obrigatório.');

    try {
      const payload = this.jwtService.verify(authorization);

      const existingUser = await this.usuariosRepository.findOne({ id: payload.id });
      if (!existingUser) throw new UnauthorizedException('Token de usuário inválido.');

      request['user'] = payload;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado.');
      }
      
      throw new UnauthorizedException('Token inválido.');
    }
  
    return true;
  }
}