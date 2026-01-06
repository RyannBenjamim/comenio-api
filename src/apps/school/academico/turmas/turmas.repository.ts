import { Injectable } from "@nestjs/common";
import { PrismaClient ,Turma } from "@prisma/client";
import { AbstractRepository } from "../../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../../common/database/prisma.service";

@Injectable()
export class TurmasRepository extends AbstractRepository<Turma, PrismaClient['turma']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.turma;
  }
}
