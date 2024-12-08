import { Prisma, Record } from '@prisma/client'

export interface RecordsRepositoryProtocol {
  create(data: Prisma.RecordCreateInput, careId: string): Promise<Record>
  remove(recordId: string): Promise<void>
  findById(recordId: string): Promise<Record | null>
  findManyByCare(careId: string): Promise<Record[]>
  findManyByPatient(patientId: string): Promise<Record[]>
  findRecordsWithinLastHour(
    careId: string,
    registerHour: Date | string,
  ): Promise<Record | Record[] | null>
  update(recordId: string, data: Prisma.RecordUpdateInput): Promise<Record>
}
