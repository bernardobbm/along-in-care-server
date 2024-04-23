import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPatientsRepository } from '../repositories/in-memory/in-memory-patients-repository'
import { CreatePatientUseCase } from './create-patient'
import { PatientAlreadyExists } from './errors/patient-already-exists-error'

let patientsRepository: InMemoryPatientsRepository
let sut: CreatePatientUseCase

describe('Create Patient Use Case', () => {
  beforeEach(() => {
    patientsRepository = new InMemoryPatientsRepository()
    sut = new CreatePatientUseCase(patientsRepository)
  })

  it('should be able to create a new patient', async () => {
    const { patient } = await sut.execute({
      name: 'John Doe',
      cpf: '000.000.000-00',
      dateOfBirth: new Date(1940, 0, 1),
      gender: 'masculino',
      caregiverId: 'caregiver-id-1',
    })

    expect(patient.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same cpf twice', async () => {
    const cpf = '000.000.000-00'

    await sut.execute({
      name: 'John Doe',
      cpf,
      dateOfBirth: new Date(1940, 0, 1),
      gender: 'masculino',
      caregiverId: 'caregiver-id-1',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        cpf,
        dateOfBirth: new Date(1940, 0, 1),
        gender: 'masculino',
        caregiverId: 'caregiver-id-2',
      }),
    ).rejects.toBeInstanceOf(PatientAlreadyExists)
  })
})
