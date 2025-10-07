/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Instituicao` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `statusContrato` on the `Professor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusContrato" AS ENUM ('ATIVO', 'SUSPENSO', 'AFASTADO', 'ENCERRADO');

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "statusContrato",
ADD COLUMN     "statusContrato" "StatusContrato" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Instituicao_cnpj_key" ON "Instituicao"("cnpj");
