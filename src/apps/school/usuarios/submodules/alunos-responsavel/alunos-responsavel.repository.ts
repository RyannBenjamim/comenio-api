import { PrismaClient, AlunosResponsavel } from "@prisma/client";
import { AbstractRepository } from "../../../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../../../common/database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AlunosResponsavelRepository extends AbstractRepository<AlunosResponsavel, PrismaClient['alunosResponsavel']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.alunosResponsavel;
  }
}