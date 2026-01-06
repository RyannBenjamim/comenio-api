/*
  Warnings:

  - Made the column `comunidadeId` on table `Curtida` required. This step will fail if there are existing NULL values in that column.
  - Made the column `comunidadeId` on table `Resposta` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Curtida" DROP CONSTRAINT "Curtida_comunidadeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Resposta" DROP CONSTRAINT "Resposta_comunidadeId_fkey";

-- AlterTable
ALTER TABLE "Curtida" ALTER COLUMN "comunidadeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Resposta" ALTER COLUMN "comunidadeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "Comunidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtida" ADD CONSTRAINT "Curtida_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "Comunidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
