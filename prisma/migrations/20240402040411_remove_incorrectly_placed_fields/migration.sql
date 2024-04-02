/*
  Warnings:

  - You are about to drop the column `alimentation_id` on the `cares` table. All the data in the column will be lost.
  - You are about to drop the column `hygiene_id` on the `cares` table. All the data in the column will be lost.
  - You are about to drop the column `medication_id` on the `cares` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cares" DROP COLUMN "alimentation_id",
DROP COLUMN "hygiene_id",
DROP COLUMN "medication_id";
