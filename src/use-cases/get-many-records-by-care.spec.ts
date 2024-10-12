import { assert, beforeEach, describe, expect, it } from 'vitest'

import { InMemoryRecordsRepository } from '../repositories/in-memory/in-memory-records-repository'
import { GetManyRecordsByCareUseCare } from './get-many-records-by-care'

let recordsRepository: InMemoryRecordsRepository
let sut: GetManyRecordsByCareUseCare

describe('Get Many Records By Care Use Case', () => {
  beforeEach(() => {
    recordsRepository = new InMemoryRecordsRepository()
    sut = new GetManyRecordsByCareUseCare(recordsRepository)
  })

  it('should be able to get all records related with a care', async () => {
    for (let i = 0; i < 3; i++) {
      await recordsRepository.create(
        {
          description: `super description ${i}`,
          time_of_accomplishment: new Date(),
          was_accomplished: true,
        },
        'care-1',
      )
    }

    const { records } = await sut.execute({ careId: 'care-1' })

    expect(records.length).toEqual(3)
    expect(records[0].description).toEqual('super description 0')
  })

  it('should receive a empty array when the care do not have records', async () => {
    const { records } = await sut.execute({ careId: 'care-1' })

    assert.isEmpty(records)
  })
})
