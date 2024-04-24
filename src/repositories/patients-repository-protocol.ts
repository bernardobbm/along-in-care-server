import { Patient, Prisma } from '@prisma/client'

export interface PatientsRepositoryProtocol {
  create(
    data: Prisma.PatientUncheckedCreateInput,
    caregiverId: string,
  ): Promise<Patient>
  findByCpf(cpf: string): Promise<Patient | null>
  findById(id: string): Promise<Patient | null>
}
