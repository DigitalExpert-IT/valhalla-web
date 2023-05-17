/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Event` table. All the data in the column will be lost.
  - Added the required column `blockNumber` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "createdAt",
ADD COLUMN     "blockNumber" DECIMAL(65,30) NOT NULL;
