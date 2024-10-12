-- DropForeignKey
ALTER TABLE "alimentations" DROP CONSTRAINT "alimentations_care_id_fkey";

-- DropForeignKey
ALTER TABLE "hygienes" DROP CONSTRAINT "hygienes_care_id_fkey";

-- DropForeignKey
ALTER TABLE "medications" DROP CONSTRAINT "medications_care_id_fkey";

-- AddForeignKey
ALTER TABLE "medications" ADD CONSTRAINT "medications_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hygienes" ADD CONSTRAINT "hygienes_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alimentations" ADD CONSTRAINT "alimentations_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE CASCADE ON UPDATE CASCADE;
