/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `Curtida` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,respostaId]` on the table `Curtida` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Curtida_userId_postId_key" ON "Curtida"("userId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "Curtida_userId_respostaId_key" ON "Curtida"("userId", "respostaId");
