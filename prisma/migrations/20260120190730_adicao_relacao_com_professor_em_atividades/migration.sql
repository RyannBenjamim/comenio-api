/*
  Warnings:

  - Added the required column `professorId` to the `Atividade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Atividade" ADD COLUMN     "professorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
