/*
  Warnings:

  - A unique constraint covering the columns `[nickname]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nickname_key" ON "Usuario"("nickname");
