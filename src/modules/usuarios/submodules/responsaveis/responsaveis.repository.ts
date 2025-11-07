import { PrismaClient ,AlunosResponsavel, Responsavel } from "@prisma/client";
import { AbstractRepository } from "../../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../../database/prisma.service";
import { Injectable } from "@nestjs/common";
import { AddResponsavelDto } from "./dto/addResponsavel.dto";

@Injectable()
export class ResponsaveisRepository extends AbstractRepository<Responsavel, PrismaClient['responsavel']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.responsavel;
  }

  // Métodos específicos de Responsaveis

  async addResponsavelToAluno(data: AddResponsavelDto): Promise<AlunosResponsavel> {
    return this.prisma.alunosResponsavel.create({ data, include: { aluno: true, responsavel: true } });
  }

  async removeResponsavelFromAluno(alunoId: string, responsavelId: string): Promise<AlunosResponsavel> {
    return this.prisma.alunosResponsavel.delete({
      where: { alunoId_responsavelId: {alunoId, responsavelId} }
    });
  }

  async getResponsavelToAluno(alunoId: string, responsavelId: string): Promise<AlunosResponsavel | null> {
    return this.prisma.alunosResponsavel.findUnique({
      where: { alunoId_responsavelId: {alunoId, responsavelId} }
    });
  }

  async getAllResponsavelToAluno(alunoId: string): Promise<AlunosResponsavel[]> {
    return this.prisma.alunosResponsavel.findMany({ where: { alunoId }, include: { responsavel: true } })
  }
}
