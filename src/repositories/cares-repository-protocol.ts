import { Care, Prisma } from '@prisma/client'

export type SpecificCares = {
  medication?: Prisma.MedicationCreateWithoutCareInput | null
  hygiene?: Prisma.HygieneCreateWithoutCareInput | null
  alimentation?: Prisma.AlimentationCreateWithoutCareInput | null
}

export interface Cares extends Care, SpecificCares {}

export interface CreateCareInput {
  patientId: string
  careDays: number[]
  data: Prisma.CareCreateManyInput
  optionalCareFields?: SpecificCares
}

export interface CaresRepositoryProtocol {
  create({
    patientId,
    careDays,
    data,
    optionalCareFields,
  }: CreateCareInput): Promise<Care>
  findById(careId: string): Promise<Cares | null>
  findMany(patientId: string): Promise<Cares[]>
  remove(careId: string): Promise<void>
}
