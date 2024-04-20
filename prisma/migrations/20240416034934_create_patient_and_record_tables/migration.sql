-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PRIMARY', 'ASSISTENT');

-- AlterTable
ALTER TABLE "caregivers" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ASSISTENT';

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "date_of_birth" TEXT NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "records" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "was_accomplished" BOOLEAN NOT NULL,
    "time_of_accomplishment" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_cpf_key" ON "patients"("cpf");
