-- CreateTable
CREATE TABLE "Product" (
    "skuId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ean" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "imageUrl" TEXT,
    "brand" TEXT,
    "rawJson" JSONB NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("skuId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_ean_key" ON "Product"("ean");
