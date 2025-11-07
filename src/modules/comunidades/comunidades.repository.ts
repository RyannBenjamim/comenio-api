import { Injectable } from "@nestjs/common";
import { PrismaClient ,Comunidade } from "@prisma/client";
import { AbstractRepository } from "../../common/repositories/AbstractRepository";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class ComunidadesRepository extends AbstractRepository<Comunidade, PrismaClient['comunidade']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.comunidade;
  }
}
