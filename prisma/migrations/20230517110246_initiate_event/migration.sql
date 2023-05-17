-- CreateTable
CREATE TABLE "NftMetadata" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "farmPercentage" DECIMAL(65,30) NOT NULL,
    "cardId" TEXT NOT NULL,
    "mintingPrice" DECIMAL(65,30) NOT NULL,
    "mintedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NftMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "event" TEXT,
    "eventSignature" TEXT,
    "args" JSONB NOT NULL,
    "blockNumber" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NftMetadata_tokenId_key" ON "NftMetadata"("tokenId");

-- CreateIndex
CREATE INDEX "NftMetadata_tokenId_idx" ON "NftMetadata"("tokenId");

-- CreateIndex
CREATE INDEX "NftMetadata_cardId_idx" ON "NftMetadata"("cardId");
