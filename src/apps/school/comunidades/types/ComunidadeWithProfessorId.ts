import { Prisma } from '@prisma/client';

export type ComunidadewithProfessorId = Prisma.ComunidadeGetPayload<{
  include: {
    aula: {
      select: { professorId: true }
    }
  }
}>;
