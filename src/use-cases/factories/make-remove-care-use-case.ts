import { PrismaCaresRepository } from '../../repositories/prisma/prisma-cares-repository'
import { RemoveCareUseCase } from '../remove-care'

export async function makeRemoveCareUseCase() {
  const careRepository = new PrismaCaresRepository()
  const removeCareUseCase = new RemoveCareUseCase(careRepository)

  return removeCareUseCase
}
