import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../database/prisma.service';
import { Prisma, Usuario } from '@prisma/client';
import { AbstractRepository } from '../../common/repositories/AbstractRepository';

const defaultUserInclude: Prisma.UsuarioInclude = {
  aluno: {
    select: {
      matricula: true,
      turmaId: true,
      statusMatricula: true
    }
  },    
  moderador: {
    select: { setor: true }
  },     
  professor: {
    select: {
      matricula: true,
      statusContrato: true,
      cargaHoraria: true
    }
  },     
  responsavel: {
    select: {
      grauParentesco: true,
      cpf: true
    }
  },   
};

@Injectable()
export class UsuariosRepository extends AbstractRepository<Usuario> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.usuario;
  }

  // Métodos específicos de Usuarios

  async findOne(where: any) {
    return this.model.findUnique({
      where,
      include: defaultUserInclude, 
    });
  }

  async findAll(args?: any) {
    return this.model.findMany({
      ...args,
      include: defaultUserInclude, 
    });
  }

  async findOneByEmail(email: string): Promise<Usuario | null> {
    return this.model.findUnique({ where: { email } });
  }
}
