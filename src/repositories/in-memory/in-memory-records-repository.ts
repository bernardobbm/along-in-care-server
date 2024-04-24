import { Prisma, Record } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { RecordsRepositoryProtocol } from '../records-repository-protocol'

export class InMemoryRecordsRepository implements RecordsRepositoryProtocol {
  public items: Record[] = []

  async create(data: Prisma.RecordUncheckedCreateInput) {
    const record = {
      id: randomUUID(),
      was_accomplished: data.was_accomplished,
      time_of_accomplishment: new Date(data.time_of_accomplishment),
      description: data.description,
      care_id: data.care_id,
    }

    this.items.push(record)

    return record
  }
}
