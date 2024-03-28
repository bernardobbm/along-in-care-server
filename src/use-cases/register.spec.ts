import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCaregiversRepository } from '../repositories/in-memory/in-memory-caregivers-repository'
import { CaregiverAlreadyExistsError } from './errors/caregiver-already-exists-error'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryCaregiversRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryCaregiversRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { caregiver } = await sut.execute({
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(caregiver.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { caregiver } = await sut.execute({
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      caregiver.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John',
      lastName: 'Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John',
        lastName: 'Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(CaregiverAlreadyExistsError)
  })
})
