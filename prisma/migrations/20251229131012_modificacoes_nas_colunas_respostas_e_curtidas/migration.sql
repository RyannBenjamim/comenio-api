-- AlterTable
ALTER TABLE "Curtida" ADD COLUMN     "comunidadeId" TEXT;

-- AlterTable
ALTER TABLE "Resposta" ADD COLUMN     "comunidadeId" TEXT;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "Comunidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtida" ADD CONSTRAINT "Curtida_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "Comunidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
