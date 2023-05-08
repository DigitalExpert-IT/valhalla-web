-- CreateTable
CREATE TABLE "NftTransaction" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,

    CONSTRAINT "NftTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NftMetadata" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "farmPercentage" DECIMAL(65,30) NOT NULL,
    "tokenType" TEXT NOT NULL,
    "mintingPrice" DECIMAL(65,30) NOT NULL,
    "mintedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NftMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NftTransaction_to_idx" ON "NftTransaction"("to");

-- CreateIndex
CREATE UNIQUE INDEX "NftMetadata_tokenId_key" ON "NftMetadata"("tokenId");

-- CreateIndex
CREATE INDEX "NftMetadata_tokenId_idx" ON "NftMetadata"("tokenId");
