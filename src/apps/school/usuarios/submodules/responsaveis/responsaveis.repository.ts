import { PrismaClient ,AlunosResponsavel, Responsavel } from "@prisma/client";
import { AbstractRepository } from "../../../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../../../common/database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ResponsaveisRepository extends AbstractRepository<Responsavel, PrismaClient['responsavel']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.responsavel;
  }
}
