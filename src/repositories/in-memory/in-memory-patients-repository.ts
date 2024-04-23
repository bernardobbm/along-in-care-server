import { Patient, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import { PatientsRepositoryProtocol } from '../patients-repository-protocol'

export class InMemoryPatientsRepository implements PatientsRepositoryProtocol {
  public items: Patient[] = []

  async create(data: Prisma.PatientUncheckedCreateInput) {
    const patient = {
      id: randomUUID(),
      cpf: data.cpf,
      name: data.name,
      gender: data.gender,
      date_of_birth: data.date_of_birth,
    }

    this.items.push(patient)

    return patient
  }

  async findByCpf(cpf: string) {
    const patient = this.items.find((item) => item.cpf === cpf)

    if (!patient) {
      return null
    }

    return patient
  }
}
