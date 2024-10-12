import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCaresRepository } from '../repositories/in-memory/in-memory-cares-repository'
import { GetCareByIdUseCare } from './get-care-by-id'

let caresRepository: InMemoryCaresRepository
let sut: GetCareByIdUseCare

describe('Get Care By Id Use Case', () => {
  beforeEach(() => {
    caresRepository = new InMemoryCaresRepository()
    sut = new GetCareByIdUseCare(caresRepository)
  })

  it('should be able to get a care by id', async () => {
    const { id } = await caresRepository.create({
      patientId: 'patient-1',
      careDays: [2, 5, 6],
      data: {
        category: 'teste',
        title: 'teste title',
        description: 'gigaton descriptions',
        frequency: 'diariamente',
        start_time: '2024-05-31T10:55:43.000Z',
        schedule_type: 'fixed',
        interval: 5,
        starts_at: '2024-05-31T10:55:43.000Z',
        ends_at: '2024-05-31T11:55:43.000Z',
        is_continuous: false,
      },
    })

    const careFound = await sut.execute({ careId: id })

    expect(careFound.id).toEqual(expect.any(String))
  })
})
