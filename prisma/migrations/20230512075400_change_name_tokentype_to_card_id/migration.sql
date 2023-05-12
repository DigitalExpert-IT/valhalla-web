/*
  Warnings:

  - You are about to drop the column `tokenType` on the `NftMetadata` table. All the data in the column will be lost.
  - Added the required column `cardId` to the `NftMetadata` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "NftMetadata_tokenType_idx";

-- AlterTable
ALTER TABLE "NftMetadata" DROP COLUMN "tokenType",
ADD COLUMN     "cardId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "NftMetadata_cardId_idx" ON "NftMetadata"("cardId");
