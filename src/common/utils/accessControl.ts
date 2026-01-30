import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Cargo } from '@prisma/client';

export async function canAccessFeed(
  prisma: PrismaService,
  feedId: string,
  instituicaoId: string,
  userRole: Cargo,
): Promise<boolean> {
  const feed = await prisma.feed.findFirst({
    where: {
      id: feedId,
      instituicaoId,
    },
    select: {
      tipoPerfil: true,
    },
  });

  if (!feed) {
    throw new NotFoundException('Feed não encontrado.');
  }

  return feed.tipoPerfil === userRole;
}

export async function canAccessComunidade(
  prisma: PrismaService,
  comunidadeId: string,
  instituicaoId: string,
  user: { id: string; role: Cargo },
): Promise<boolean> {
  const comunidade = await prisma.comunidade.findFirst({
    where: {
      id: comunidadeId,
      instituicaoId,
    },
    include: {
      aula: {
        select: {
          professorId: true,
          turma: {
            select: {
              alunos: {
                where: { userId: user.id },
                select: { userId: true },
              },
            },
          },
        },
      },
    },
  });

  if (!comunidade) {
    throw new NotFoundException('Comunidade não encontrada.');
  }

  if (
    user.role === Cargo.PROFESSOR &&
    comunidade.aula?.professorId === user.id
  ) {
    return true;
  }

  if (
    user.role === Cargo.ALUNO &&
    comunidade.aula?.turma?.alunos?.length > 0
  ) {
    return true;
  }

  return false;
}
