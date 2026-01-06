import { PrismaClient, Aluno } from "@prisma/client";
import { AbstractRepository } from "../../../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../../../common/database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AlunosRepository extends AbstractRepository<Aluno, PrismaClient['aluno']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.aluno;
  }
}