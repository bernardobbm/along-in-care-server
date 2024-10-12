import { PrismaRecordsRepository } from '../../repositories/prisma/prisma-records-repository'
import { GetManyRecordsByCareUseCare } from '../get-many-records-by-care'

export function makeGetManyRecordsByCare() {
  const recordsRepository = new PrismaRecordsRepository()
  const getManyRecordsByCareUseCase = new GetManyRecordsByCareUseCare(
    recordsRepository,
  )

  return getManyRecordsByCareUseCase
}
