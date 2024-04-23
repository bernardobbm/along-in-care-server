import { PrismaPatientsRepository } from '../../repositories/prisma/prisma-patients-repository'
import { CreatePatientUseCase } from '../create-patient'

export function makeCreatePatientUseCase() {
  const patientRepository = new PrismaPatientsRepository()
  const createPatientUseCase = new CreatePatientUseCase(patientRepository)

  return createPatientUseCase
}
