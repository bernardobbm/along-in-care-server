/*
  Warnings:

  - You are about to drop the `caregiver_cares` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `caregiver_records` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "caregiver_cares" DROP CONSTRAINT "caregiver_cares_care_id_fkey";

-- DropForeignKey
ALTER TABLE "caregiver_cares" DROP CONSTRAINT "caregiver_cares_caregiver_id_fkey";

-- DropForeignKey
ALTER TABLE "caregiver_records" DROP CONSTRAINT "caregiver_records_caregiver_id_fkey";

-- DropForeignKey
ALTER TABLE "caregiver_records" DROP CONSTRAINT "caregiver_records_record_id_fkey";

-- DropTable
DROP TABLE "caregiver_cares";

-- DropTable
DROP TABLE "caregiver_records";
