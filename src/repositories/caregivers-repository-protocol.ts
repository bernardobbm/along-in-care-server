import { Caregiver, Prisma } from '@prisma/client'

export interface CaregiversRepositoryProtocol {
  create(data: Prisma.CaregiverCreateInput): Promise<Caregiver>
  findByEmail(email: string): Promise<Caregiver | null>
}
