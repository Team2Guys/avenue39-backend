/*
  Warnings:

  - You are about to drop the column `composition` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `isMotorized` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `motorPrice` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `pattern` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `additionalInfo` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isMotorized` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `maxHeight` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `maxWidth` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `measuringGuide` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `minHeight` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `minWidth` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `motorPrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `pattern` on the `Product` table. All the data in the column will be lost.
  - Added the required column `discountPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "composition",
DROP COLUMN "height",
DROP COLUMN "isMotorized",
DROP COLUMN "motorPrice",
DROP COLUMN "pattern",
DROP COLUMN "width",
ADD COLUMN     "discountPrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "material" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "additionalInfo",
DROP COLUMN "isMotorized",
DROP COLUMN "maxHeight",
DROP COLUMN "maxWidth",
DROP COLUMN "measuringGuide",
DROP COLUMN "minHeight",
DROP COLUMN "minWidth",
DROP COLUMN "motorPrice",
DROP COLUMN "pattern";
