import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCaresRepository } from '../repositories/in-memory/in-memory-cares-repository'
import { CreateCareUseCase } from './create-care'
import { MissingFieldError } from './errors/missing-field-error'

let caresRepository: InMemoryCaresRepository
let sut: CreateCareUseCase

describe('Create Care Use Case', () => {
  beforeEach(() => {
    caresRepository = new InMemoryCaresRepository()
    sut = new CreateCareUseCase(caresRepository)
  })

  it('should be able to create a new care', async () => {
    const { care } = await sut.execute('patient-1', {
      careProperties: {
        category: 'other',
        title: 'teste',
        description: 'gigaton teste',
        frequency: 'qualquer coisa',
        start_time: new Date('2024-05-31T10:55:43.000Z'),
        schedule_type: 'test',
        interval: 5,
        is_continuous: false,
        starts_at: new Date('2024-05-31T10:55:43.000Z'),
        ends_at: new Date().setFullYear(2026),
      },
    })

    expect(care?.id).toEqual(expect.any(String))
  })

  it('should be able to create a new medication care', async () => {
    const { medication } = await sut.execute('patient-1', {
      careType: 'medication',
      careProperties: {
        category: 'other',
        title: 'teste',
        description: 'gigaton teste',
        frequency: 'qualquer coisa',
        startTime: new Date(),
        schedule_type: 'fixed',
        interval: 5,
        is_continuous: false,
        starts_at: new Date(),
        ends_at: new Date().setFullYear(2026),
        medication: {
          unit: 'ml',
          quantity: 5,
          administrationRoute: 'oral',
        },
      },
    })

    expect(medication?.id).toEqual(expect.any(String))
    expect(caresRepository.medications[0].care_id).toEqual(medication?.id)
  })

  it('should be able to create a new hygiene care', async () => {
    const { hygiene } = await sut.execute('patient-1', {
      careType: 'hygiene',
      careProperties: {
        category: 'other',
        title: 'teste',
        description: 'gigaton teste',
        frequency: 'qualquer coisa',
        startTime: new Date(),
        schedule_type: 'fixed',
        interval: 5,
        is_continuous: false,
        starts_at: new Date(),
        ends_at: new Date().setFullYear(2026),
        hygiene: {
          hygieneCategory: 'higiene master',
          instructions: 'pipipi popopo',
        },
      },
    })

    expect(hygiene?.id).toEqual(expect.any(String))
    expect(caresRepository.hygienes[0].care_id).toEqual(hygiene?.id)
  })

  it('should be able to create a new alimentation care', async () => {
    const { alimentation } = await sut.execute('patient-1', {
      careType: 'alimentation',
      careProperties: {
        category: 'other',
        title: 'teste',
        description: 'gigaton teste',
        frequency: 'qualquer coisa',
        startTime: new Date(),
        schedule_type: 'fixed',
        interval: 5,
        is_continuous: false,
        starts_at: new Date(),
        ends_at: new Date().setFullYear(2026),
        alimentation: {
          meal: 'mil',
          food: 'comida',
          notRecommendedFood: 'cimento',
        },
      },
    })

    expect(alimentation?.id).toEqual(expect.any(String))
    expect(caresRepository.alimentations[0].care_id).toEqual(alimentation?.id)
  })

  it('should not be able to create a new care', async () => {
    const { care } = await sut.execute('patient-1', {
      careProperties: '',
    })

    await expect(
      sut.execute('patient-1', {
        careProperties: {
          category: undefined,
          title: undefined,
          description: undefined,
          frequency: undefined,
        },
      }),
    ).rejects.toBeInstanceOf(MissingFieldError)
  })
})
