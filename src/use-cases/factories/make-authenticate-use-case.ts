import { PrismaCaregiversRepository } from '../../repositories/prisma/prisma-caregivers-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const caregiversRepository = new PrismaCaregiversRepository()
  const authenticateUseCase = new AuthenticateUseCase(caregiversRepository)

  return authenticateUseCase
}
