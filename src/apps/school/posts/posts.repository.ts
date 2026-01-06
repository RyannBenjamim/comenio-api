import { Injectable } from "@nestjs/common";
import { PrismaClient, Post } from "@prisma/client";
import { AbstractRepository } from "../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../common/database/prisma.service";

@Injectable()
export class PostsRepository extends AbstractRepository<Post, PrismaClient['post']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.post;
  }

  // Métodos específicos de Posts

  async resolveContext(
    id: string,
    instituicaoId: string
  ): Promise<{ feedId: string | null; comunidadeId: string | null } | null> {
    return this.model.findUnique({
      where: { id, instituicaoId },
      select: {
        feedId: true,
        comunidadeId: true,
      },
    });
  }
}
