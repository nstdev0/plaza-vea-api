-- CreateTable
CREATE TABLE "Product" (
    "skuId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "searchName" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "imageUrl" TEXT,
    "brand" TEXT,
    "category" TEXT[],
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "supermarket" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("skuId")
);
