/*
  Warnings:

  - You are about to drop the column `hygieneCategory` on the `hygienes` table. All the data in the column will be lost.
  - Added the required column `hygiene_category` to the `hygienes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hygienes" DROP COLUMN "hygieneCategory",
ADD COLUMN     "hygiene_category" TEXT NOT NULL;
