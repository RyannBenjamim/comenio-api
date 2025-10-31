import { Injectable } from "@nestjs/common";
import { Materia } from "@prisma/client";
import { AbstractRepository } from "../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../database/prisma.service";

@Injectable()
export class MateriasRepository extends AbstractRepository<Materia> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.materia;
  }
}
