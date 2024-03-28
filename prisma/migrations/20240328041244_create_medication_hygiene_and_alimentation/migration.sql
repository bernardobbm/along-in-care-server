-- CreateTable
CREATE TABLE "medications" (
    "id" TEXT NOT NULL,
    "administration_route" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "care_id" TEXT NOT NULL,

    CONSTRAINT "medications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hygienes" (
    "id" TEXT NOT NULL,
    "hygieneCategory" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "care_id" TEXT NOT NULL,

    CONSTRAINT "hygienes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alimentations" (
    "id" TEXT NOT NULL,
    "meal" TEXT NOT NULL,
    "food" TEXT NOT NULL,
    "not_recommended_food" TEXT NOT NULL,
    "care_id" TEXT NOT NULL,

    CONSTRAINT "alimentations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "medications_care_id_key" ON "medications"("care_id");

-- CreateIndex
CREATE UNIQUE INDEX "hygienes_care_id_key" ON "hygienes"("care_id");

-- CreateIndex
CREATE UNIQUE INDEX "alimentations_care_id_key" ON "alimentations"("care_id");

-- AddForeignKey
ALTER TABLE "medications" ADD CONSTRAINT "medications_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hygienes" ADD CONSTRAINT "hygienes_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alimentations" ADD CONSTRAINT "alimentations_care_id_fkey" FOREIGN KEY ("care_id") REFERENCES "cares"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
