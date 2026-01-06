import { Injectable } from "@nestjs/common";
import { PrismaClient ,Feed, Cargo } from "@prisma/client";
import { AbstractRepository } from "../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../common/database/prisma.service";

@Injectable()
export class FeedsRepository extends AbstractRepository<
  Feed,
  PrismaClient['feed']
> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.feed;
  }

  // Métodos específicos de Feeds

  async resolveAccessContext(
    id: string,
    instituicaoId: string,
  ): Promise<{ tipoPerfil: Cargo } | null> {
    return this.model.findFirst({
      where: {
        id,
        instituicaoId,
      },
      select: {
        tipoPerfil: true,
      },
    });
  }
}

