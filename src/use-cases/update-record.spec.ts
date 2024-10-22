import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryRecordsRepository } from '../repositories/in-memory/in-memory-records-repository'
import { AlreadyHaveARecordForThisHourError } from './errors/already-have-a-record-for-this-hour-error'
import { UpdateRecordUseCase } from './update-record'

let recordsRepository: InMemoryRecordsRepository
let sut: UpdateRecordUseCase

describe('Update Care Use Case', () => {
  beforeEach(() => {
    recordsRepository = new InMemoryRecordsRepository()
    sut = new UpdateRecordUseCase(recordsRepository)
  })

  it('should be able to update a record', async () => {
    const { id } = await recordsRepository.create(
      {
        was_accomplished: true,
        description: 'description amazing omg',
        time_of_accomplishment: '2024-07-30T13:01:44Z',
      },
      'care-1',
    )

    const { record } = await sut.execute({
      recordId: id,
      data: {
        description: 'updated amazing description 2024',
        time_of_accomplishment: new Date('2024-07-30T15:02:44Z'),
      },
    })

    expect(record.description).toEqual('updated amazing description 2024')
    expect(record.time_of_accomplishment).toEqual(
      new Date('2024-07-30T15:02:44Z'),
    )
  })

  it('should not be able to update time of accomplishment if already exists a record for that hour', async () => {
    await recordsRepository.create(
      {
        was_accomplished: true,
        description: 'description gigaton',
        time_of_accomplishment: new Date('2024-07-30T15:01:44Z'),
      },
      'care-1',
    )

    const { id } = await recordsRepository.create(
      {
        was_accomplished: true,
        description: 'description amazing omg',
        time_of_accomplishment: new Date('2024-07-30T13:01:44Z'),
      },
      'care-1',
    )

    await expect(() =>
      sut.execute({
        recordId: id,
        data: {
          description: 'updated amazing description 2024',
          time_of_accomplishment: new Date('2024-07-30T15:10:44Z'),
        },
      }),
    ).rejects.toBeInstanceOf(AlreadyHaveARecordForThisHourError)
  })
})
