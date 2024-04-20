/*
  Warnings:

  - You are about to drop the column `weekDay` on the `care_week_days` table. All the data in the column will be lost.
  - You are about to drop the column `schedule` on the `cares` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[week_day,care_id]` on the table `care_week_days` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `week_day` to the `care_week_days` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interval` to the `cares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `care_id` to the `records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observation` to the `records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "care_week_days" DROP COLUMN "weekDay",
ADD COLUMN     "week_day" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "caregivers" ADD COLUMN     "patient_id" TEXT;

-- AlterTable
ALTER TABLE "cares" DROP COLUMN "schedule",
ADD COLUMN     "interval" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "records" ADD COLUMN     "care_id" TEXT NOT NULL,
ADD COLUMN     "observation" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "caregiver_cares" (
    "id" TEXT NOT NULL,
    "caregiver_id" TEXT NOT NULL,
    "care_id" TEXT NOT NULL,

    CONSTRAINT "caregiver_cares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_cares" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "care_id" TEXT NOT NULL,

    CONSTRAINT "patient_cares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caregiver_records" (
    "id" TEXT NOT NULL,
    "caregiver_id" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,

    CONSTRAINT "caregiver_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "care_week_days_week_day_care_id_key" ON "care_week_days"("week_day", "care_id");

-- AddForeignKey
ALTER TABLE "caregivers" ADD CONSTRAINT "caregivers_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caregiver_cares" ADD CONSTRAINT "caregiver_cares_caregiver_id_fkey" FOREIGN KEY ("caregiver_id") REFERENCES "caregivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caregiver_cares" ADD CONSTRAINT "caregiver_cares_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_cares" ADD CONSTRAINT "patient_cares_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_cares" ADD CONSTRAINT "patient_cares_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caregiver_records" ADD CONSTRAINT "caregiver_records_caregiver_id_fkey" FOREIGN KEY ("caregiver_id") REFERENCES "caregivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caregiver_records" ADD CONSTRAINT "caregiver_records_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
