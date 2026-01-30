import { Prisma } from '@prisma/client';

export type ComunidadeWithProfessor = Prisma.ComunidadeGetPayload<{
  include: {
    aula: {
      select: {
        professor: {
          select: {
            usuario: {
              select: {
                primeiroNome: true;
                sobrenome: true;
              };
            };
          };
        };
      };
    };
  };
}>;
