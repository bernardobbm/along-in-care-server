-- DropForeignKey
ALTER TABLE "alimentations" DROP CONSTRAINT "alimentations_care_id_fkey";

-- DropForeignKey
ALTER TABLE "care_week_days" DROP CONSTRAINT "care_week_days_care_id_fkey";

-- DropForeignKey
ALTER TABLE "hygienes" DROP CONSTRAINT "hygienes_care_id_fkey";

-- DropForeignKey
ALTER TABLE "medications" DROP CONSTRAINT "medications_care_id_fkey";

-- DropForeignKey
ALTER TABLE "patient_cares" DROP CONSTRAINT "patient_cares_care_id_fkey";

-- DropForeignKey
ALTER TABLE "records" DROP CONSTRAINT "records_care_id_fkey";

-- AddForeignKey
ALTER TABLE "patient_cares" ADD CONSTRAINT "patient_cares_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medications" ADD CONSTRAINT "medications_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hygienes" ADD CONSTRAINT "hygienes_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alimentations" ADD CONSTRAINT "alimentations_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "care_week_days" ADD CONSTRAINT "care_week_days_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE CASCADE ON UPDATE CASCADE;
