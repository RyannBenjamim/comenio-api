import { PrismaService } from '../../../../common/database/prisma.service';

type ContextResult = {
  feedId: string | null;
  comunidadeId: string | null;
};

export async function resolvePostContext(
  prisma: PrismaService,
  id: string,
  instituicaoId: string,
): Promise<ContextResult | null> {
  return prisma.post.findUnique({
    where: {
      id,
      instituicaoId,
    },
    select: {
      feedId: true,
      comunidadeId: true,
    },
  });
}

export async function resolveCurtidaContext(
  prisma: PrismaService,
  id: string,
  instituicaoId: string,
): Promise<ContextResult | null> {
  return prisma.curtida.findUnique({
    where: {
      id,
      instituicaoId,
    },
    select: {
      feedId: true,
      comunidadeId: true,
    },
  });
}

export async function resolveRespostaContext(
  prisma: PrismaService,
  id: string,
  instituicaoId: string,
): Promise<ContextResult | null> {
  return prisma.resposta.findUnique({
    where: {
      id,
      instituicaoId,
    },
    select: {
      feedId: true,
      comunidadeId: true,
    },
  });
}
