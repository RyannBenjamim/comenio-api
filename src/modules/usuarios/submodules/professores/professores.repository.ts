import { PrismaClient ,Professor } from "@prisma/client";
import { AbstractRepository } from "../../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../../database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProfessoresRepository extends AbstractRepository<Professor, PrismaClient['professor']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.professor;
  }
}