import { Injectable } from "@nestjs/common";
import { PrismaClient, Correcao } from "@prisma/client";
import { AbstractRepository } from "../../../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../../../common/database/prisma.service";

@Injectable()
export class CorrecoesRepository extends AbstractRepository<Correcao, PrismaClient['correcao']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.correcao;
  }
}