/*
  Warnings:

  - You are about to drop the `patient_cares` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "patient_cares" DROP CONSTRAINT "patient_cares_care_id_fkey";

-- DropForeignKey
ALTER TABLE "patient_cares" DROP CONSTRAINT "patient_cares_patient_id_fkey";

-- DropTable
DROP TABLE "patient_cares";

-- CreateTable
CREATE TABLE "_CareToPatient" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CareToPatient_AB_unique" ON "_CareToPatient"("A", "B");

-- CreateIndex
CREATE INDEX "_CareToPatient_B_index" ON "_CareToPatient"("B");

-- AddForeignKey
ALTER TABLE "_CareToPatient" ADD CONSTRAINT "_CareToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "cares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CareToPatient" ADD CONSTRAINT "_CareToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
