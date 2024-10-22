import { PrismaPatientsRepository } from '../../repositories/prisma/prisma-patients-repository'
import { UpdatePatientUseCase } from '../update-patient'

export function makeUpdatePatientUseCase() {
  const patientsRepository = new PrismaPatientsRepository()
  const updatePatientUseCase = new UpdatePatientUseCase(patientsRepository)

  return updatePatientUseCase
}
