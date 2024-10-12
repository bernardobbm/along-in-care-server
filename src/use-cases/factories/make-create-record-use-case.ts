import { PrismaRecordsRepository } from '../../repositories/prisma/prisma-records-repository'
import { CreateRecordUseCase } from '../create-record'

export function makeCreateRecordUseCase() {
  const recordRepository = new PrismaRecordsRepository()
  const createRecordUseCase = new CreateRecordUseCase(recordRepository)

  return createRecordUseCase
}
