import { Injectable } from "@nestjs/common";
import { Curtida, PrismaClient } from "@prisma/client";
import { AbstractRepository } from "../../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../../database/prisma.service";

@Injectable()
export class CurtidasRepository extends AbstractRepository<Curtida, PrismaClient['curtida']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.curtida;
  }
}
