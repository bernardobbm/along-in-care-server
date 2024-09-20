import { Care, Prisma } from '@prisma/client'

export type Cares = {
  medication?: Prisma.MedicationCreateWithoutCareInput | null
  hygiene?: Prisma.HygieneCreateWithoutCareInput | null
  alimentation?: Prisma.AlimentationCreateWithoutCareInput | null
}

export interface CaresRepositoryProtocol {
  create(
    patientId: string,
    data: Prisma.CareCreateManyInput,
    optionalCareFields?: Cares,
  ): Promise<Care>
  findMany(patientId: string): Promise<Cares[]>
}
