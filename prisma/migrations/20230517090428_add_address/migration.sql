/*
  Warnings:

  - Added the required column `address` to the `NftMetadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NftMetadata" ADD COLUMN     "address" TEXT NOT NULL;
