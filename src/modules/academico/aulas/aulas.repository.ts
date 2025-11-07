import { Injectable } from "@nestjs/common";
import { PrismaClient, Aula } from "@prisma/client";
import { AbstractRepository } from "../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../database/prisma.service";

@Injectable()
export class AulasRepository extends AbstractRepository<Aula, PrismaClient['aula']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.aula;
  }
}
