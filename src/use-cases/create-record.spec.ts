import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryRecordsRepository } from '../repositories/in-memory/in-memory-records-repository'
import { CreateRecordUseCase } from './create-record'

let recordsRepository: InMemoryRecordsRepository
let sut: CreateRecordUseCase

describe('Create Record Use Case', () => {
  beforeEach(() => {
    recordsRepository = new InMemoryRecordsRepository()
    sut = new CreateRecordUseCase(recordsRepository)
  })

  it('should be able to create a new record', async () => {
    const { record } = await sut.execute({
      wasAccomplished: true,
      description: 'in fact, it was a care execution',
      timeOfAccomplishment: new Date(),
      careId: 'secret-care',
    })

    expect(record.id).toEqual(expect.any(String))
  })

  // it('should not be able to create a record with less than one hour after the previous', async () => {})
})
