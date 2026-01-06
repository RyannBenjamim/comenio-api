import { Injectable } from "@nestjs/common";
import { PrismaClient ,Comunidade } from "@prisma/client";
import { AbstractRepository } from "../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../common/database/prisma.service";

@Injectable()
export class ComunidadesRepository extends AbstractRepository<
  Comunidade,
  PrismaClient['comunidade']
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.comunidade;
  }

  // Métodos específicos de Comunidades

  async resolveAccessContext(
    id: string,
    instituicaoId: string,
    userId: string,
  ) {
    return this.model.findFirst({
      where: {
        id,
        instituicaoId,
      },
      include: {
        aula: {
          select: {
            professorId: true,
            turma: {
              select: {
                alunos: {
                  where: { userId },
                  select: { userId: true },
                },
              },
            },
          },
        },
      },
    });
  }
}
