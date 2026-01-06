-- DropForeignKey
ALTER TABLE "public"."Resposta" DROP CONSTRAINT "Resposta_postId_fkey";

-- AlterTable
ALTER TABLE "Resposta" ALTER COLUMN "postId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Resposta" ADD CONSTRAINT "Resposta_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
