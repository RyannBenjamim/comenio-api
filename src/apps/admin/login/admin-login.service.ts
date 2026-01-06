import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SuperadminRepository } from '../superadmin/superadmin.repository';

@Injectable()
export class LoginService {
  constructor(
    private readonly superadminRepository: SuperadminRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(email: string, senha: string): Promise<{ access_token: string }> {
    const superadmin = await this.superadminRepository.findByEmail(email);

    if (!superadmin) {
      throw new NotFoundException('Credenciais inválidas.');
    }

    const passwordMatch = await bcrypt.compare(senha, superadmin.senha);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = {
      id: superadmin.id,
      role: 'SUPERADMIN',
    };

    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }
}

