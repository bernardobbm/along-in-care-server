import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCaregiversRepository } from '../repositories/in-memory/in-memory-caregivers-repository'
import { InMemoryPatientsRepository } from '../repositories/in-memory/in-memory-patients-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetPatientUseCase } from './get-patient'

let caregiversRepository: InMemoryCaregiversRepository
let patientsRepository: InMemoryPatientsRepository
let sut: GetPatientUseCase

describe('Get Caregiver Profile Use Case', () => {
  beforeEach(() => {
    caregiversRepository = new InMemoryCaregiversRepository()
    patientsRepository = new InMemoryPatientsRepository()
    sut = new GetPatientUseCase(caregiversRepository, patientsRepository)
  })

  it('should be able to get a patient info', async () => {
    const createdCaregiver = await caregiversRepository.create({
      name: 'john',
      last_name: 'doe',
      email: 'john@doe.com',
      password_hash: await hash('123456', 6),
    })

    const { id } = await patientsRepository.create({
      name: 'carlos ycro',
      cpf: '00000000000',
      gender: 'masculino',
      date_of_birth: new Date(1950, 0, 1).toDateString(),
    })

    createdCaregiver.patient_id = id

    const { patient } = await sut.execute({
      caregiverId: createdCaregiver.id,
    })

    expect(patient.id).equals(id)
  })

  it('should not be able to get a patient without a caregiver', async () => {
    const createdCaregiver = await caregiversRepository.create({
      name: 'john',
      last_name: 'doe',
      email: 'john@doe.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      sut.execute({
        caregiverId: createdCaregiver.id,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
