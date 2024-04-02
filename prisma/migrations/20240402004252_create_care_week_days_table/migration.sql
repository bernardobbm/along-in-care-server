/*
  Warnings:

  - You are about to drop the column `alimentationId` on the `cares` table. All the data in the column will be lost.
  - You are about to drop the column `hygieneId` on the `cares` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cares" DROP COLUMN "alimentationId",
DROP COLUMN "hygieneId",
ADD COLUMN     "alimentation_id" TEXT,
ADD COLUMN     "hygiene_id" TEXT,
ADD COLUMN     "medication_id" TEXT;

-- CreateTable
CREATE TABLE "care_week_days" (
    "id" TEXT NOT NULL,
    "weekDay" INTEGER NOT NULL,
    "care_id" TEXT NOT NULL,

    CONSTRAINT "care_week_days_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "care_week_days" ADD CONSTRAINT "care_week_days_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
