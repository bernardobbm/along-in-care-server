import { assert, beforeEach, describe, expect, it } from 'vitest'

import { InMemoryRecordsRepository } from '../repositories/in-memory/in-memory-records-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { RemoveRecordUseCase } from './remove-record'

let recordsRepository: InMemoryRecordsRepository
let sut: RemoveRecordUseCase

describe('Remove Record Use Case', () => {
  beforeEach(async () => {
    recordsRepository = new InMemoryRecordsRepository()
    sut = new RemoveRecordUseCase(recordsRepository)
  })

  it('should be able to remove a record', async () => {
    const { id } = await recordsRepository.create(
      {
        was_accomplished: true,
        description: 'in fact, it was a care execution',
        time_of_accomplishment: new Date(),
      },
      'care-1',
    )

    await sut.execute({ recordId: id })

    await expect(recordsRepository.findById(id)).resolves.toEqual(null)
    assert.isEmpty(recordsRepository.items)
  })

  it('should not be able to remove a record without a valid id', async () => {
    await expect(() =>
      sut.execute({ recordId: 'id-gigaton' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
