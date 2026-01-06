import { Injectable } from "@nestjs/common";
import { PrismaClient, Resolucao } from "@prisma/client";
import { AbstractRepository } from "../../../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../../../common/database/prisma.service";

@Injectable()
export class ResolucoesRepository extends AbstractRepository<Resolucao, PrismaClient['resolucao']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.resolucao;
  }
}
