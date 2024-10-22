import { PrismaCaresRepository } from '../../repositories/prisma/prisma-cares-repository'
import { UpdateCareUseCase } from '../update-care'

export function makeUpdateCareUseCase() {
  const caresRepository = new PrismaCaresRepository()
  const updateCareUseCase = new UpdateCareUseCase(caresRepository)

  return updateCareUseCase
}
