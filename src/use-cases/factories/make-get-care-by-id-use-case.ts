import { PrismaCaresRepository } from '../../repositories/prisma/prisma-cares-repository'
import { GetCareByIdUseCare } from '../get-care-by-id'

export function makeGetCareByIdUseCase() {
  const caresRepository = new PrismaCaresRepository()
  const getCareByIdUseCase = new GetCareByIdUseCare(caresRepository)

  return getCareByIdUseCase
}
