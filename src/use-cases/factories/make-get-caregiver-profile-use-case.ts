import { PrismaCaregiversRepository } from '../../repositories/prisma/prisma-caregivers-repository'
import { GetCaregiverProfileUseCase } from '../get-caregiver-profile'

export function makeGetCaregiverProfileUseCase() {
  const caregiverRepository = new PrismaCaregiversRepository()
  const getCaregiverProfile = new GetCaregiverProfileUseCase(
    caregiverRepository,
  )

  return getCaregiverProfile
}
