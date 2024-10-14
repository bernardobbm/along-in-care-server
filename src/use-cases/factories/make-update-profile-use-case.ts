import { PrismaCaregiversRepository } from '../../repositories/prisma/prisma-caregivers-repository'
import { UpdateCaregiverProfileUseCase } from '../update-caregiver-profile'

export function makeUpdateProfileUseCase() {
  const caregiversRepository = new PrismaCaregiversRepository()
  const updateProfileUseCase = new UpdateCaregiverProfileUseCase(
    caregiversRepository,
  )

  return updateProfileUseCase
}
