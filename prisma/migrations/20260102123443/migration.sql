/*
  Warnings:

  - You are about to drop the column `shortDescription` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `shortDescription` on the `Subcategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "shortDescription";

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "shortDescription";
