import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCaregiversRepository } from '../repositories/in-memory/in-memory-caregivers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetCaregiverProfileUseCase } from './get-caregiver-profile'

let caregiversRepository: InMemoryCaregiversRepository
let sut: GetCaregiverProfileUseCase

describe('Get Caregiver Profile Use Case', () => {
  beforeEach(() => {
    caregiversRepository = new InMemoryCaregiversRepository()
    sut = new GetCaregiverProfileUseCase(caregiversRepository)
  })

  it('should be able to get user profile', async () => {
    const createdCaregiver = await caregiversRepository.create({
      name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { caregiver } = await sut.execute({
      caregiverId: createdCaregiver.id,
    })

    expect(caregiver.id).toEqual(expect.any(String))
    expect(caregiver.name).toEqual('John')
  })

  it('should not be able to get caregiver profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        caregiverId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
