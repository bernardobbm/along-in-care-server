import { hash } from 'bcryptjs'
import { assert, beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCaregiversRepository } from '../repositories/in-memory/in-memory-caregivers-repository'
import { DeleteProfileUserCase } from './delete-profile'

let caregiversRepository: InMemoryCaregiversRepository
let sut: DeleteProfileUserCase

describe('Remove Care Use Case', () => {
  beforeEach(async () => {
    caregiversRepository = new InMemoryCaregiversRepository()
    sut = new DeleteProfileUserCase(caregiversRepository)
  })

  it('should be able to delete a caregiver profile', async () => {
    const { id } = await caregiversRepository.create({
      name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await sut.execute({ caregiverId: id })

    assert.isEmpty(caregiversRepository.items)
    expect(caregiversRepository.items[0]).toEqual(undefined)
  })
})
