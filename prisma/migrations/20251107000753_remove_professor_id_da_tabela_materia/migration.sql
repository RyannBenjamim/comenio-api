/*
  Warnings:

  - You are about to drop the column `materiaId` on the `Comunidade` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `Comunidade` table. All the data in the column will be lost.
  - You are about to drop the column `turmaId` on the `Comunidade` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `Materia` table. All the data in the column will be lost.
  - You are about to drop the `AlunosMateria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfessoresTurma` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[aulaId]` on the table `Comunidade` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aulaId` to the `Comunidade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."AlunosMateria" DROP CONSTRAINT "AlunosMateria_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AlunosMateria" DROP CONSTRAINT "AlunosMateria_materiaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comunidade" DROP CONSTRAINT "Comunidade_materiaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comunidade" DROP CONSTRAINT "Comunidade_professorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comunidade" DROP CONSTRAINT "Comunidade_turmaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Materia" DROP CONSTRAINT "Materia_professorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProfessoresTurma" DROP CONSTRAINT "ProfessoresTurma_professorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProfessoresTurma" DROP CONSTRAINT "ProfessoresTurma_turmaId_fkey";

-- DropIndex
DROP INDEX "public"."Comunidade_materiaId_key";

-- AlterTable
ALTER TABLE "Comunidade" DROP COLUMN "materiaId",
DROP COLUMN "professorId",
DROP COLUMN "turmaId",
ADD COLUMN     "aulaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Materia" DROP COLUMN "professorId";

-- DropTable
DROP TABLE "public"."AlunosMateria";

-- DropTable
DROP TABLE "public"."ProfessoresTurma";

-- CreateTable
CREATE TABLE "Aula" (
    "id" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "materiaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aula_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aula_professorId_turmaId_materiaId_key" ON "Aula"("professorId", "turmaId", "materiaId");

-- CreateIndex
CREATE UNIQUE INDEX "Comunidade_aulaId_key" ON "Comunidade"("aulaId");

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comunidade" ADD CONSTRAINT "Comunidade_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "Aula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
