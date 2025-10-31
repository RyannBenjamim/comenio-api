import { Injectable } from "@nestjs/common";
import { Comunidade } from "@prisma/client";
import { AbstractRepository } from "../../common/repositories/AbstractRepository";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class ComunidadesRepository extends AbstractRepository<Comunidade> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.comunidade;
  }
}
