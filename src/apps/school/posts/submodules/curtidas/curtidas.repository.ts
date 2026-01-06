import { Injectable } from "@nestjs/common";
import { Curtida, PrismaClient } from "@prisma/client";
import { AbstractRepository } from "../../../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../../../common/database/prisma.service";

@Injectable()
export class CurtidasRepository extends AbstractRepository<Curtida, PrismaClient['curtida']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.curtida;
  }

  // Métodos específicos de Curtidas

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
