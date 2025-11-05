/*
  Warnings:

  - Changed the type of `tipoPerfil` on the `Feed` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Feed" DROP COLUMN "tipoPerfil",
ADD COLUMN     "tipoPerfil" "Cargo" NOT NULL;
