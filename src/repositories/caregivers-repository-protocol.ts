import { Caregiver, Prisma } from '@prisma/client'

export interface CaregiversRepositoryProtocol {
  create(data: Prisma.CaregiverUncheckedCreateInput): Promise<Caregiver>
  findByEmail(email: string): Promise<Caregiver | null>
  findById(id: string): Promise<Caregiver | null>
}
