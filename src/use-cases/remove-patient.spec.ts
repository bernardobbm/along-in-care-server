import { assert, beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPatientsRepository } from '../repositories/in-memory/in-memory-patients-repository'
import { CaregiverWithoutAPatientError } from './errors/caregiver-without-a-patient-error'
import { RemovePatientUseCase } from './remove-patient'

let patientsRepository: InMemoryPatientsRepository
let sut: RemovePatientUseCase

describe('Remove Patient Use Case', () => {
  beforeEach(async () => {
    patientsRepository = new InMemoryPatientsRepository()
    sut = new RemovePatientUseCase(patientsRepository)
  })

  it('should be able to remove a patient', async () => {
    const { id } = await patientsRepository.create({
      cpf: '00000000001',
      name: 'john patient',
      gender: 'masculino',
      date_of_birth: '1940-04-23T12:00:00Z',
    })

    await sut.execute({ patientId: id })

    const patient = await patientsRepository.findByCpf('00000000001')

    expect(patient).toEqual(null)
    assert.isEmpty(patientsRepository.items)
  })

  it('should not be able to remove a patient if the caregiver do not register one', async () => {
    await expect(() =>
      sut.execute({ patientId: 'patient-0' }),
    ).rejects.toBeInstanceOf(CaregiverWithoutAPatientError)
  })
})
