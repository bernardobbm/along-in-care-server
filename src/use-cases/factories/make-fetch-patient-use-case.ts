import { PrismaCaregiversRepository } from '../../repositories/prisma/prisma-caregivers-repository'
import { PrismaPatientsRepository } from '../../repositories/prisma/prisma-patients-repository'
import { GetPatientUseCase } from '../get-patient'

export function makeFetchPatientUseCase() {
  const caregiverRepository = new PrismaCaregiversRepository()
  const patientRepository = new PrismaPatientsRepository()

  const fetchPatient = new GetPatientUseCase(
    caregiverRepository,
    patientRepository,
  )

  return fetchPatient
}
