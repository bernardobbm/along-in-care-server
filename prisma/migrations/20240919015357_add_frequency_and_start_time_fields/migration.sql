/*
  Warnings:

  - Added the required column `frequency` to the `cares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `cares` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cares" ADD COLUMN     "frequency" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;