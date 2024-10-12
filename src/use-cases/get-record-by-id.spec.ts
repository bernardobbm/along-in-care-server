import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRecordsRepository } from '../repositories/in-memory/in-memory-records-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetRecordByIdUseCase } from './get-record-by-id'

let recordsRepository: InMemoryRecordsRepository
let sut: GetRecordByIdUseCase

describe('Get Record By Id Use Case', () => {
  beforeEach(() => {
    recordsRepository = new InMemoryRecordsRepository()
    sut = new GetRecordByIdUseCase(recordsRepository)
  })

  it('should be able to get a record by id', async () => {
    const { id } = await recordsRepository.create(
      {
        was_accomplished: true,
        description: 'in fact, it was a care execution',
        time_of_accomplishment: new Date(),
      },
      'secret-care',
    )

    const { record } = await sut.execute({ recordId: id })

    expect(record.id).toEqual(expect.any(String))
  })

  it('should not be able to get a record without a valid id', async () => {
    await expect(() =>
      sut.execute({ recordId: 'ben-10-alien-force' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
