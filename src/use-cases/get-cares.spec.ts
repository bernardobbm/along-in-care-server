import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCaresRepository } from '../repositories/in-memory/in-memory-cares-repository'
import { GetCaresUseCase } from './get-cares'

let caresRepository: InMemoryCaresRepository
let sut: GetCaresUseCase

describe('Get Care List Use Case', () => {
  beforeEach(() => {
    caresRepository = new InMemoryCaresRepository()
    sut = new GetCaresUseCase(caresRepository)
  })

  it('should be able to get all cares related with a patient', async () => {
    await caresRepository.create({
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

    await caresRepository.create({
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
      optionalCareFields: {
        medication: {
          unit: 'ml',
          quantity: 5,
          administration_route: 'oral',
        },
      },
    })

    const { cares } = await sut.execute({ patientId: 'patient-1' })

    expect(cares.length).equals(2)
    expect(cares[0]).toHaveProperty('id')
    expect(cares[1].medication).not.toBe(null)
  })
})
