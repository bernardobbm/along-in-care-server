import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRecordsRepository } from '../repositories/in-memory/in-memory-records-repository'
import { GetAllRecordsUseCase } from './get-all-records'

let recordsRepository: InMemoryRecordsRepository
let sut: GetAllRecordsUseCase

describe('Get All Records Use Case', () => {
  beforeEach(() => {
    recordsRepository = new InMemoryRecordsRepository()
    sut = new GetAllRecordsUseCase(recordsRepository)
  })

  it('should be able to get all records from a specific patient', async () => {
    await recordsRepository.create(
      {
        description: 'care-1 description',
        time_of_accomplishment: new Date(),
        was_accomplished: true,
      },
      'care-1',
    )

    await recordsRepository.create(
      {
        description: 'care-2 description',
        time_of_accomplishment: new Date(),
        was_accomplished: true,
      },
      'care-2',
    )

    const { records } = await sut.execute({ patientId: 'patient-1' })

    expect(records[0].id).toEqual(expect.any(String))
    expect(records.length).toBe(2)
  })

  it('should not be able to get all records when the patient id is missing or wrong', async () => {
    await recordsRepository.create(
      {
        description: 'care-1 description',
        time_of_accomplishment: new Date(),
        was_accomplished: true,
      },
      'care-1',
    )

    await recordsRepository.create(
      {
        description: 'care-2 description',
        time_of_accomplishment: new Date(),
        was_accomplished: true,
      },
      'care-2',
    )

    const { records } = await sut.execute({ patientId: 'patient-2' })

    expect(records.length).toBe(0)
  })
})
