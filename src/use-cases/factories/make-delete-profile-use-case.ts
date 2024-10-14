import { PrismaCaregiversRepository } from '../../repositories/prisma/prisma-caregivers-repository'
import { DeleteProfileUserCase } from '../delete-profile'

export function makeDeleteProfileUserCase() {
  const caregiversRepository = new PrismaCaregiversRepository()
  const deleteProfileUserCase = new DeleteProfileUserCase(caregiversRepository)

  return deleteProfileUserCase
}
