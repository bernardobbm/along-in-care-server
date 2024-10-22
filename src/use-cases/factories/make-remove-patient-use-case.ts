import { PrismaPatientsRepository } from '../../repositories/prisma/prisma-patients-repository'
import { RemovePatientUseCase } from '../remove-patient'

export function makeRemovePatientUseCase() {
  const patientsRepository = new PrismaPatientsRepository()
  const removePatientUseCase = new RemovePatientUseCase(patientsRepository)

  return removePatientUseCase
}
