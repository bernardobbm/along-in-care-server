import { Prisma, Record } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { RecordsRepositoryProtocol } from '../records-repository-protocol'

export class InMemoryRecordsRepository implements RecordsRepositoryProtocol {
  public items: Record[] = []

  async create(data: Prisma.RecordCreateInput, careId: string) {
    const record = {
      id: randomUUID(),
      was_accomplished: data.was_accomplished,
      time_of_accomplishment: new Date(data.time_of_accomplishment),
      description: data.description,
      care_id: careId,
    }

    this.items.push(record)

    return record
  }

  async findById(recordId: string) {
    const record = this.items.find((record) => record.id === recordId)

    if (!record) return null

    return record
  }

  async findManyByCare(careId: string) {
    const records = this.items.filter((record) => record.care_id === careId)

    return records
  }

  async findRecordsWithinLastHour(careId: string, registerHour: Date | string) {
    const oneHourBeforeFromGivenDate = new Date(
      new Date(registerHour).getTime() - 60 * 60 * 1000,
    )

    const records = this.items.filter((record) => record.care_id === careId)

    const filteredRecords = records.filter((record) => {
      if (oneHourBeforeFromGivenDate > record.time_of_accomplishment) {
        return false
      }

      return record
    })

    if (filteredRecords.length === 0) return null

    return filteredRecords
  }

  async remove(recordId: string) {
    this.items = this.items.filter((item) => {
      return item.id !== recordId
    })
  }

  async update(recordId: string, data: Prisma.RecordUpdateInput) {
    const recordIndex = this.items.findIndex((record) => record.id === recordId)
    const record = this.items[recordIndex]

    // todo?: corrigir tipagem desse 'keyof object' e outras que influenciem
    for (const prop in record) {
      if (data[prop as keyof object] !== undefined) {
        record[prop as keyof Record] = data[prop as keyof object]
      }
    }

    return record
  }
}
