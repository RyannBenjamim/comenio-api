import { Injectable } from "@nestjs/common";
import { AlunosMateria, Materia } from "@prisma/client";
import { AbstractRepository } from "../../../common/repositories/AbstractRepository";
import { PrismaService } from "../../../database/prisma.service";
import { EnrollDto } from "./dto/enroll.dto";

@Injectable()
export class MateriasRepository extends AbstractRepository<Materia> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.materia;
  }

  // Métodos específicos de Materias

  async enrollAlunoInMateria(data: EnrollDto): Promise<AlunosMateria> {
    return this.prisma.alunosMateria.create({ data });
  }

  async unenrollAlunoInMateria(alunoId: string, materiaId: string): Promise<void> {
    await this.prisma.alunosMateria.delete({
      where: { alunoId_materiaId: { alunoId, materiaId } }
    })
  }
}
