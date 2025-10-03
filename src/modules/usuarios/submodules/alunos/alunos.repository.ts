import { Aluno } from "@prisma/client";
import { AbstractRepository } from "../../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../../database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AlunosRepository extends AbstractRepository<Aluno> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.aluno;
  }
}