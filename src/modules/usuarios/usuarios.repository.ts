import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../database/prisma.service';
import { Usuario } from '@prisma/client';
import { AbstractRepository } from 'src/common/repositories/AbstractRepository';

@Injectable()
export class UsuariosRepository extends AbstractRepository<Usuario> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.usuario;
  }

  // Métodos específicos de Usuarios

  async findOneByEmail(email: string): Promise<Usuario | null> {
    return this.model.findUnique({ where: { email } });
  }
}
