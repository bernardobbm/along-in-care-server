import { beforeEach, describe, expect, it } from 'vitest'

import { hash } from 'bcryptjs'
import { InMemoryCaregiversRepository } from '../repositories/in-memory/in-memory-caregivers-repository'
import { EmailAlreadyInUseError } from './errors/email-already-in-use-error'
import { UpdateCaregiverProfileUseCase } from './update-caregiver-profile'

let caregiversRepository: InMemoryCaregiversRepository
let sut: UpdateCaregiverProfileUseCase

describe('Update Caregiver Profile Use Case', () => {
  beforeEach(() => {
    caregiversRepository = new InMemoryCaregiversRepository()
    sut = new UpdateCaregiverProfileUseCase(caregiversRepository)
  })

  it('should be able to update some info in caregiver profile', async () => {
    const { id } = await caregiversRepository.create({
      name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { caregiver } = await sut.execute({
      caregiverId: id,
      email: 'johndoe2233@example.com',
      password: '123456',
    })

    expect(caregiver.email).toEqual('johndoe2233@example.com')
  })

  it('should not be able to change to a email already in use', async () => {
    const { id } = await caregiversRepository.create({
      name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await caregiversRepository.create({
      name: 'carlos',
      last_name: 'ycaro',
      email: 'ycarocarlis@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        caregiverId: id,
        name: 'seu joão',
        email: 'ycarocarlis@example.com',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyInUseError)
  })
})
