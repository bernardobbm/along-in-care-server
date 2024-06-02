import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCaresRepository } from '../repositories/in-memory/in-memory-cares-repository'
import { CreateCareUseCase } from './create-care'

let caresRepository: InMemoryCaresRepository
let sut: CreateCareUseCase

describe('Create Care Use Case', () => {
  beforeEach(() => {
    caresRepository = new InMemoryCaresRepository()
    sut = new CreateCareUseCase(caresRepository)
  })

  it('should be able to create a new care', async () => {
    const { care } = await sut.execute({
      careProperties: {
        category: 'other',
        title: 'teste',
        description: 'gigaton teste',
        schedule_type: 'test',
        interval: 5,
        is_continuous: false,
        starts_at: new Date(),
        ends_at: new Date().setFullYear(2026),
      },
    })

    expect(care?.id).toEqual(expect.any(String))
  })

  it('should be able to create a new medication care', async () => {
    const { medication } = await sut.execute({
      careType: 'medication',
      careProperties: {
        category: 'other',
        title: 'teste',
        description: 'gigaton teste',
        schedule_type: 'test',
        interval: 5,
        is_continuous: false,
        starts_at: new Date(),
        ends_at: new Date().setFullYear(2026),
        medication: {
          administration_route: 'oral',
          quantity: 5,
          unit: 'ml',
        },
      },
    })

    expect(medication?.id).toEqual(expect.any(String))
    expect(medication?.care_id).toEqual(expect.any(String))
  })
})
