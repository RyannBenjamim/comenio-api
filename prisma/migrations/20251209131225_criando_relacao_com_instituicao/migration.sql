/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `AlunosResponsavel` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AlunosResponsavel` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Moderador` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Moderador` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Responsavel` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Responsavel` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Superadmin` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Superadmin` table. All the data in the column will be lost.
  - Added the required column `instituicaoId` to the `Atividade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituicaoId` to the `Aula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituicaoId` to the `Comunidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituicaoId` to the `Correcao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituicaoId` to the `Curtida` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituicaoId` to the `Feed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituicaoId` to the `Materia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituicaoId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituicaoId` to the `Resolucao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituicaoId` to the `Resposta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituicaoId` to the `Turma` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "AlunosResponsavel" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Atividade" ADD COLUMN     "instituicaoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Aula" ADD COLUMN     "instituicaoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comunidade" ADD COLUMN     "instituicaoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Correcao" ADD COLUMN     "instituicaoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Curtida" ADD COLUMN     "instituicaoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Feed" ADD COLUMN     "instituicaoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Materia" ADD COLUMN     "instituicaoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Moderador" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "instituicaoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Resolucao" ADD COLUMN     "instituicaoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Responsavel" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Resposta" ADD COLUMN     "instituicaoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Superadmin" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Turma" ADD COLUMN     "instituicaoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Turma" ADD CONSTRAINT "Turma_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comunidade" ADD CONSTRAINT "Comunidade_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resolucao" ADD CONSTRAINT "Resolucao_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correcao" ADD CONSTRAINT "Correcao_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtida" ADD CONSTRAINT "Curtida_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
