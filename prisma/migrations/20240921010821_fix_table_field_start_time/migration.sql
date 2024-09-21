/*
  Warnings:

  - You are about to drop the column `startTime` on the `cares` table. All the data in the column will be lost.
  - Added the required column `start_time` to the `cares` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cares" DROP COLUMN "startTime",
ADD COLUMN     "start_time" TEXT NOT NULL;
