import { Prisma, Record } from '@prisma/client'

export interface RecordsRepositoryProtocol {
  create(data: Prisma.RecordUncheckedCreateInput): Promise<Record>
}
