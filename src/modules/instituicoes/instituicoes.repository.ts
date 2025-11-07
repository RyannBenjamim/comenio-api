import { Injectable } from "@nestjs/common";
import { PrismaClient ,Instituicao } from "@prisma/client";
import { AbstractRepository } from "../../common/repositories/AbstractRepository";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class InstituicoesRepository extends AbstractRepository<Instituicao, PrismaClient['instituicao']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.instituicao;
  }
}