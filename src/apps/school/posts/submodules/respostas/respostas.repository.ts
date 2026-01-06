import { Injectable } from "@nestjs/common";
import { PrismaClient, Resposta } from "@prisma/client";
import { AbstractRepository } from "../../../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../../../common/database/prisma.service";

@Injectable()
export class RespostasRepository extends AbstractRepository<Resposta, PrismaClient['resposta']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.resposta;
  }

  // Métodos específicos de Respostas

  async resolveContext(
    id: string,
    instituicaoId: string
  ): Promise<{ feedId: string | null; comunidadeId: string | null } | null> {
    return this.model.findFirst({
      where: { id, instituicaoId },
      select: {
        feedId: true,
        comunidadeId: true,
      },
    });
  }
}
