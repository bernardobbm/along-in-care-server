import { PrismaRecordsRepository } from '../../repositories/prisma/prisma-records-repository'
import { RemoveRecordUseCase } from '../remove-record'

export async function makeRemoveRecordUseCase() {
  const recordsRepository = new PrismaRecordsRepository()
  const removeRecordsUseCase = new RemoveRecordUseCase(recordsRepository)

  return removeRecordsUseCase
}
