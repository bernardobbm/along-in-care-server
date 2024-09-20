import { PrismaCaresRepository } from '../../repositories/prisma/prisma-cares-repository'
import { GetCaresUseCase } from '../get-cares'

export function makeFetchCaresUseCase() {
  const caresRepository = new PrismaCaresRepository()
  const getCaresUseCase = new GetCaresUseCase(caresRepository)

  return getCaresUseCase
}
