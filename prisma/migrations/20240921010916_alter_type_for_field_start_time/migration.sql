/*
  Warnings:

  - Changed the type of `start_time` on the `cares` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "cares" DROP COLUMN "start_time",
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL;
