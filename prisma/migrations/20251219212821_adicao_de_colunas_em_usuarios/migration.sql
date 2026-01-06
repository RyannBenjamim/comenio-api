/*
  Warnings:

  - Added the required column `bio` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "nickname" TEXT NOT NULL;
