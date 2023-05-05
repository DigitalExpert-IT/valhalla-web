/*
  Warnings:

  - You are about to drop the column `idNft` on the `Nft` table. All the data in the column will be lost.
  - Added the required column `ownerAddress` to the `Nft` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Nft_idNft_idx";

-- AlterTable
ALTER TABLE "Nft" DROP COLUMN "idNft",
ADD COLUMN     "ownerAddress" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Nft_ownerAddress_idx" ON "Nft"("ownerAddress");
