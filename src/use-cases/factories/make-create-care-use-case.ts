import { PrismaCaresRepository } from '../../repositories/prisma/prisma-cares-repository'
import { CreateCareUseCase } from '../create-care'

export function makeCreateCareUseCase() {
  const careRepository = new PrismaCaresRepository()
  const createCareUseCase = new CreateCareUseCase(careRepository)

  return createCareUseCase
}
