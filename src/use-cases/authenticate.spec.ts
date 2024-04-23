import { beforeEach, describe, expect, it } from 'vitest'

import { hash } from 'bcryptjs'
import { InMemoryCaregiversRepository } from '../repositories/in-memory/in-memory-caregivers-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let caregiversRepository: InMemoryCaregiversRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    caregiversRepository = new InMemoryCaregiversRepository()
    sut = new AuthenticateUseCase(caregiversRepository)
  })

  it('should be able to authenticate', async () => {
    await caregiversRepository.create({
      name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { caregiver } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(caregiver.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await caregiversRepository.create({
      name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
