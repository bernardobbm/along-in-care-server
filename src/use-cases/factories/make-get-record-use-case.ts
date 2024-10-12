import { PrismaRecordsRepository } from '../../repositories/prisma/prisma-records-repository'
import { GetRecordByIdUseCase } from '../get-record-by-id'

export function makeGetRecordUseCase() {
  const recordsRepository = new PrismaRecordsRepository()
  const getRecordUseCase = new GetRecordByIdUseCase(recordsRepository)

  return getRecordUseCase
}
