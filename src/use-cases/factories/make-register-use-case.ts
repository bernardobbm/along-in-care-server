import { PrismaCaregiversRepository } from '../../repositories/prisma/prisma-caregivers-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const caregiversRepository = new PrismaCaregiversRepository()
  const registerUseCase = new RegisterUseCase(caregiversRepository)

  return registerUseCase
}
