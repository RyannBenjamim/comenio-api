import { Injectable } from "@nestjs/common";
import { PrismaClient, Resposta } from "@prisma/client";
import { AbstractRepository } from "../../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../../database/prisma.service";

@Injectable()
export class RespostasRepository extends AbstractRepository<Resposta, PrismaClient['resposta']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.resposta;
  }
}
