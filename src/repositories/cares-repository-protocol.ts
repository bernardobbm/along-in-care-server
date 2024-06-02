import { Alimentation, Care, Hygiene, Medication, Prisma } from '@prisma/client'

export type CreateMedicationCareInput = Prisma.CareCreateManyInput & {
  medication: Prisma.MedicationCreateWithoutCareInput
}

export type CreateAlimentationCareInput = Prisma.CareCreateManyInput & {
  alimentation: Prisma.AlimentationCreateWithoutCareInput
}

export type CreateHygieneCareInput = Prisma.CareCreateManyInput & {
  hygiene: Prisma.HygieneCreateWithoutCareInput
}

export interface CaresRepositoryProtocol {
  createCare(data: Prisma.CareCreateManyInput): Promise<Care>
  createMedicationCare(data: CreateMedicationCareInput): Promise<Medication>
  createAlimentationCare(
    data: CreateAlimentationCareInput,
  ): Promise<Alimentation>
  createHygieneCare(data: CreateHygieneCareInput): Promise<Hygiene>
}
