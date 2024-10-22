import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPatientsRepository } from '../repositories/in-memory/in-memory-patients-repository'
import { PatientAlreadyExists } from './errors/patient-already-exists-error'
import { UpdatePatientUseCase } from './update-patient'

let patientsRepository: InMemoryPatientsRepository
let sut: UpdatePatientUseCase

describe('Update Care Use Case', () => {
  beforeEach(() => {
    patientsRepository = new InMemoryPatientsRepository()
    sut = new UpdatePatientUseCase(patientsRepository)
  })

  it('should be able to update a patient', async () => {
    const { id } = await patientsRepository.create({
      name: 'John Doe',
      cpf: '000.000.000-00',
      date_of_birth: new Date(1940, 0, 1),
      gender: 'masculino',
    })

    const { patient } = await sut.execute({
      patientId: id,
      data: {
        name: 'João Goias',
        cpf: '000.000.000-33',
      },
    })

    expect(patient.name).toEqual('João Goias')
    expect(patient.cpf).toEqual('000.000.000-33')
  })

  it('should not be able to update a patient cpf to a cpf already in use', async () => {
    const { id } = await patientsRepository.create({
      name: 'John Doe',
      cpf: '000.000.000-00',
      date_of_birth: new Date(1940, 0, 1),
      gender: 'masculino',
    })

    await patientsRepository.create({
      name: 'Mary Doe',
      cpf: '000.000.000-33',
      date_of_birth: new Date(1940, 0, 1),
      gender: 'feminino',
    })

    await expect(() =>
      sut.execute({
        patientId: id,
        data: {
          name: 'João Goias',
          cpf: '000.000.000-33',
        },
      }),
    ).rejects.toBeInstanceOf(PatientAlreadyExists)
  })
})
