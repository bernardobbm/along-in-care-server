import { $Enums, Caregiver, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import { CaregiversRepositoryProtocol } from '../caregivers-repository-protocol'

export class InMemoryCaregiversRepository
  implements CaregiversRepositoryProtocol
{
  public items: Caregiver[] = []

  async findById(id: string) {
    const caregiver = this.items.find((item) => item.id === id)

    if (!caregiver) {
      return null
    }

    return caregiver
  }

  async create(data: Prisma.CaregiverUncheckedCreateInput) {
    const caregiver = {
      id: randomUUID(),
      name: data.name,
      role: $Enums.Role.ASSISTANT,
      last_name: data.last_name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      patient_id: null,
    }

    this.items.push(caregiver)

    return caregiver
  }

  async findByEmail(email: string) {
    const caregiver = this.items.find((item) => item.email === email)

    if (!caregiver) {
      return null
    }

    return caregiver
  }
}
