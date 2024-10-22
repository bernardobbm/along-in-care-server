import { PrismaRecordsRepository } from '../../repositories/prisma/prisma-records-repository'
import { UpdateRecordUseCase } from '../update-record'

export function makeUpdateRecordUseCase() {
  const recordsRepository = new PrismaRecordsRepository()
  const updateRecordUseCase = new UpdateRecordUseCase(recordsRepository)

  return updateRecordUseCase
}
