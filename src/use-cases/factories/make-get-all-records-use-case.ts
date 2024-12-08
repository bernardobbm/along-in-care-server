import { PrismaRecordsRepository } from '../../repositories/prisma/prisma-records-repository'
import { GetAllRecordsUseCase } from '../get-all-records'

export function makeGetAllRecordsUseCase() {
  const recordsRepository = new PrismaRecordsRepository()
  const getAllRecordsUseCase = new GetAllRecordsUseCase(recordsRepository)

  return getAllRecordsUseCase
}
