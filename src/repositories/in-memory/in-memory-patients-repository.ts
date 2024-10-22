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
      date_of_birth: new Date(data.date_of_birth),
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

  async findById(id: string) {
    const patient = this.items.find((item) => item.id === id)

    if (!patient) {
      return null
    }

    return patient
  }

  async remove(id: string) {
    this.items = this.items.filter((patient) => patient.id !== id)
  }

  async update(id: string, data: Prisma.PatientUpdateInput) {
    const patientIndex = this.items.findIndex((patient) => patient.id === id)
    const patient = this.items[patientIndex]

    // todo?: corrigir tipagem desse 'keyof object' e outras que influenciem
    for (const prop in patient) {
      if (data[prop as keyof object] !== undefined) {
        patient[prop as keyof Patient] = data[prop as keyof object]
      }
    }

    return patient
  }
}
