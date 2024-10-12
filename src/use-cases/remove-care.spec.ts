import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCaresRepository } from '../repositories/in-memory/in-memory-cares-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { RemoveCareUseCase } from './remove-care'

let caresRepository: InMemoryCaresRepository
let sut: RemoveCareUseCase

describe('Remove Care Use Case', () => {
  beforeEach(async () => {
    caresRepository = new InMemoryCaresRepository()
    sut = new RemoveCareUseCase(caresRepository)
  })

  it('should be able to remove a care', async () => {
    const { id } = await caresRepository.create({
      patientId: 'patient-1',
      careDays: [],
      data: {
        category: 'other',
        title: 'teste',
        description: 'gigaton teste',
        frequency: 'qualquer coisa',
        start_time: new Date(),
        schedule_type: 'fixed',
        interval: 5,
        is_continuous: false,
        starts_at: new Date('2024-10-09T01:17:23.338Z'),
        ends_at: new Date('2025-10-09T01:17:23.338Z'),
      },
      optionalCareFields: {
        medication: {
          unit: 'ml',
          quantity: 5,
          administration_route: 'oral',
        },
      },
    })

    await sut.execute({ careId: id })

    await expect(caresRepository.findById(id)).resolves.toEqual(null)
  })

  it('should remove all related medications, hygienes or alimentations tables', async () => {
    const { id } = await caresRepository.create({
      patientId: 'patient-1',
      careDays: [],
      data: {
        category: 'other',
        title: 'teste',
        description: 'gigaton teste',
        frequency: 'qualquer coisa',
        start_time: new Date(),
        schedule_type: 'fixed',
        interval: 5,
        is_continuous: false,
        starts_at: new Date('2024-10-09T01:17:23.338Z'),
        ends_at: new Date('2025-10-09T01:17:23.338Z'),
      },
      optionalCareFields: {
        medication: {
          unit: 'ml',
          quantity: 5,
          administration_route: 'oral',
        },
      },
    })

    await sut.execute({ careId: id })

    await expect(caresRepository.findById(id)).resolves.toEqual(null)

    expect(
      caresRepository.medications.find(
        (medication) => medication.care_id === id,
      ),
    ).toEqual(undefined)
  })

  it('should not be able to remove a care without a valid id', async () => {
    await expect(() =>
      sut.execute({ careId: 'id-secrets' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
