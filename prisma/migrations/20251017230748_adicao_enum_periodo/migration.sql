/*
  Warnings:

  - Changed the type of `periodo` on the `Turma` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Periodo" AS ENUM ('MANHA', 'TARDE', 'NOITE');

-- AlterTable
ALTER TABLE "Turma" DROP COLUMN "periodo",
ADD COLUMN     "periodo" "Periodo" NOT NULL;
