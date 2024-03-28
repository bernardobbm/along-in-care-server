import { Caregiver, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CaregiversRepositoryProtocol } from '../caregivers-repository-protocol'

export class InMemoryCaregiversRepository
  implements CaregiversRepositoryProtocol
{
  public items: Caregiver[] = []

  async create(data: Prisma.CaregiverCreateInput) {
    const caregiver = {
      id: randomUUID(),
      name: data.name,
      last_name: data.last_name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
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
