import { Injectable } from "@nestjs/common";
import { Instituicao } from "@prisma/client";
import { AbstractRepository } from "../../common/repositories/AbstractRepository";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class InstituicoesRepository extends AbstractRepository<Instituicao> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.instituicao;
  }
}