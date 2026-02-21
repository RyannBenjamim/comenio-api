import { Prisma } from "@prisma/client";

// Modelo padrão de include para respostas
export const respostaIncludes = {
  user: {
    select: {
      primeiroNome: true,
      nickname: true,
      fotoPerfilUrl: true,
    },
  },
  post: {
    select: {
      id: true,
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
  },
  respostaPai: {
    select: {
      id: true,
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
  },
  comunidade: {
    select: { id: true, titulo: true },
  },
  feed: {
    select: { id: true, titulo: true },
  },
} as const satisfies Prisma.RespostaInclude;

// Tipo real retornado pelo Prisma quando respostaIncludes é utilizado
export type RespostaWithIncludes = Prisma.RespostaGetPayload<{
  include: typeof respostaIncludes;
}>;