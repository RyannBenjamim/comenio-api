-- DropForeignKey
ALTER TABLE "public"."Curtida" DROP CONSTRAINT "Curtida_comunidadeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Resposta" DROP CONSTRAINT "Resposta_comunidadeId_fkey";

-- AlterTable
ALTER TABLE "Curtida" ADD COLUMN     "feedId" TEXT,
ALTER COLUMN "comunidadeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Resposta" ADD COLUMN     "feedId" TEXT,
ALTER COLUMN "comunidadeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "Comunidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtida" ADD CONSTRAINT "Curtida_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtida" ADD CONSTRAINT "Curtida_comunidadeId_fkey" FOREIGN KEY ("comunidadeId") REFERENCES "Comunidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
