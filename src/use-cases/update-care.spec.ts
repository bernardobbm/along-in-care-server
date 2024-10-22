import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCaresRepository } from '../repositories/in-memory/in-memory-cares-repository'
import { UpdateCareUseCase } from './update-care'

let caresRepository: InMemoryCaresRepository
let sut: UpdateCareUseCase

describe('Update Care Use Case', () => {
  beforeEach(() => {
    caresRepository = new InMemoryCaresRepository()
    sut = new UpdateCareUseCase(caresRepository)
  })

  it('should be able to update a care and related tables', async () => {
    await caresRepository.create({
      patientId: 'patient-1',
      careDays: [2, 4, 6],
      data: {
        category: 'other',
        title: 'teste',
        description: 'gigaton teste',
        frequency: 'qualquer coisa',
        start_time: new Date('2024-05-31T10:55:43.000Z'),
        schedule_type: 'test',
        interval: 5,
        is_continuous: false,
        starts_at: new Date('2024-05-31T10:55:43.000Z'),
        ends_at: new Date('2026-05-31T10:55:43.000Z'),
      },
      optionalCareFields: {
        medication: {
          unit: 'ml',
          quantity: 5,
          administration_route: 'oral',
        },
      },
    })

    const { care } = await sut.execute('1', {
      careType: 'medication',
      careProperties: {
        title: 'titulo atualizado',
        description: 'atualizei a descrição',
        frequency: 'qualquer coisa',
        medication: {
          administration_route: 'sublingual',
          unit: 'comprimido',
          quantity: 2,
        },
      },
    })

    expect(care.title).toEqual('titulo atualizado')
    expect(care.medication?.administration_route).toEqual('sublingual')
  })
})
