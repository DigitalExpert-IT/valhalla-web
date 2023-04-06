-- CreateTable
CREATE TABLE "Nft" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "idNft" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "probability" INTEGER NOT NULL,

    CONSTRAINT "Nft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Nft_idNft_idx" ON "Nft"("idNft");
