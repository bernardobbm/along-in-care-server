import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryRecordsRepository } from '../repositories/in-memory/in-memory-records-repository'
import { CreateRecordUseCase } from './create-record'
import { AlreadyHaveARecordForThisHourError } from './errors/already-have-a-record-for-this-hour-error'

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

  it('should not be able to create a record with less than one hour after the previous', async () => {
    await sut.execute({
      wasAccomplished: true,
      description: 'in fact, it was a care execution',
      timeOfAccomplishment: new Date('2024-07-30T13:01:44Z'),
      careId: 'secret-care',
    })

    await expect(() =>
      sut.execute({
        wasAccomplished: true,
        description: 'yeah, in fact, it was a care execution again',
        timeOfAccomplishment: new Date('2024-07-30T13:11:44Z'),
        careId: 'secret-care',
      }),
    ).rejects.toBeInstanceOf(AlreadyHaveARecordForThisHourError)
  })
})
