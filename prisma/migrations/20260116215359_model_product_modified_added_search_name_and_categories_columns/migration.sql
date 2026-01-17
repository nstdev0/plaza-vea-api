/*
  Warnings:

  - Added the required column `searchName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "searchName" TEXT NOT NULL;
