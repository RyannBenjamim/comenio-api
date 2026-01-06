import { PrismaClient ,Moderador } from "@prisma/client";
import { AbstractRepository } from "../../../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../../../common/database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ModeradoresRepository extends AbstractRepository<Moderador, PrismaClient['moderador']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.moderador;
  }
}
