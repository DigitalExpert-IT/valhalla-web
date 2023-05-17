-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "eventSignature" TEXT NOT NULL,
    "args" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_transactionHash_key" ON "Event"("transactionHash");
