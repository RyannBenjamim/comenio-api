import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/database/prisma.service';
import { PrismaClient ,Prisma, Usuario } from '@prisma/client';
import { AbstractRepository } from '../../../common/repositories/AbstractRepository';
import { MyProfile } from 'src/common/interfaces/MyProfile';

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
export class UsuariosRepository extends AbstractRepository<Usuario, PrismaClient['usuario']> {
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

  async findMyProfile(
    where: Prisma.UsuarioWhereUniqueInput
  ): Promise<MyProfile | null> {
    return this.model.findUnique({
      where,
      select: {
        id: true,
        primeiroNome: true,
        sobrenome: true,
        bio: true,
        nickname: true,
        fotoPerfilUrl: true,
        aluno: {
          select: {
            turma: {
              select: { titulo: true }
            }
          }
        }
      },
    })
  }
}
