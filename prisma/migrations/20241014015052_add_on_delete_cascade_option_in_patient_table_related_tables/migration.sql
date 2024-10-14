-- DropForeignKey
ALTER TABLE "patient_cares" DROP CONSTRAINT "patient_cares_patient_id_fkey";

-- AddForeignKey
ALTER TABLE "patient_cares" ADD CONSTRAINT "patient_cares_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
