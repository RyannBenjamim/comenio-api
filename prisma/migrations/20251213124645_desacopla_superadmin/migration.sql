/*
  Warnings:

  - The values [SUPERADMIN] on the enum `Cargo` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Superadmin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Superadmin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Instituicao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Superadmin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Instituicao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataNascimento` to the `Superadmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Superadmin` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Superadmin` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `primeiroNome` to the `Superadmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Superadmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sobrenome` to the `Superadmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Superadmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Superadmin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Cargo_new" AS ENUM ('ADMIN', 'MODERADOR', 'PROFESSOR', 'ALUNO', 'RESPONSAVEL');
ALTER TABLE "Usuario" ALTER COLUMN "cargo" TYPE "Cargo_new" USING ("cargo"::text::"Cargo_new");
ALTER TABLE "Feed" ALTER COLUMN "tipoPerfil" TYPE "Cargo_new" USING ("tipoPerfil"::text::"Cargo_new");
ALTER TYPE "Cargo" RENAME TO "Cargo_old";
ALTER TYPE "Cargo_new" RENAME TO "Cargo";
DROP TYPE "public"."Cargo_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Superadmin" DROP CONSTRAINT "Superadmin_userId_fkey";

-- AlterTable
ALTER TABLE "Instituicao" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Superadmin" DROP CONSTRAINT "Superadmin_pkey",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "primeiroNome" TEXT NOT NULL,
ADD COLUMN     "senha" TEXT NOT NULL,
ADD COLUMN     "sobrenome" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Superadmin_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Instituicao_email_key" ON "Instituicao"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Superadmin_email_key" ON "Superadmin"("email");
