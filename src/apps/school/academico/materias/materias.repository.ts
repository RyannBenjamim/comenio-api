import { Injectable } from "@nestjs/common";
import { PrismaClient, Materia } from "@prisma/client";
import { AbstractRepository } from "../../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../../common/database/prisma.service";

@Injectable()
export class MateriasRepository extends AbstractRepository<Materia, PrismaClient['materia']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.materia;
  }
}
