/*
  Warnings:

  - You are about to drop the column `address` on the `NftMetadata` table. All the data in the column will be lost.
  - Added the required column `address` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NftMetadata" DROP COLUMN "address";
