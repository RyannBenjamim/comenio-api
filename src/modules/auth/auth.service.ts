import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsuariosRepository } from '../usuarios/usuarios.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsuariosRepository,
    private readonly jwtService: JwtService
  ) {}

  async signin(email: string, senha: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOneByEmail(email)
    if (!user) throw new NotFoundException('Credenciais inválidas.');

    const passwordMath = await bcrypt.compare(senha, user.senha);
    if (!passwordMath) throw new UnauthorizedException('Credenciais inválidas.');
    
    const payload = { id: user.id, role: user.cargo }
    const token = await this.jwtService.signAsync(payload)

    return { access_token: token }
  }
}