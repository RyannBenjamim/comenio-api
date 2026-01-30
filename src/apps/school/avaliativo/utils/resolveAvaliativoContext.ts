import { PrismaService } from '../../../../common/database/prisma.service';

type AtividadeContextResult = {
  atividadeId: string | null;
  comunidadeId: string | null;
};

type ResolucaoContextResult = {
  id: string | null;
  comunidadeId: string | null;
};


export async function resolveAtividadeContext(
  prisma: PrismaService,
  id: string,
  instituicaoId: string,
): Promise<ResolucaoContextResult | null> {
  return prisma.atividade.findUnique({
    where: {
      id,
      instituicaoId,
    },
    select: {
      id: true,
      comunidadeId: true,
    },
  });
}

export async function resolveResolucaoContext(
  prisma: PrismaService,
  id: string,
  instituicaoId: string,
): Promise<AtividadeContextResult | null> {
  const resolucao = await prisma.resolucao.findUnique({
    where: {
      id,
      instituicaoId,
    },
    select: {
      atividade: {
        select: {
          id: true,
          comunidadeId: true,
        },
      },
    },
  });

  if (!resolucao?.atividade) return null;

  return {
    atividadeId: resolucao.atividade.id,
    comunidadeId: resolucao.atividade.comunidadeId,
  };
}
