import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { CaregiversRepositoryProtocol } from '../caregivers-repository-protocol'

export class PrismaCaregiversRepository
  implements CaregiversRepositoryProtocol
{
  async findById(id: string) {
    const caregiver = await prisma.caregiver.findUnique({
      where: { id },
    })

    return caregiver
  }

  async findByEmail(email: string) {
    const caregiver = await prisma.caregiver.findUnique({
      where: {
        email,
      },
    })

    return caregiver
  }

  async create(data: Prisma.CaregiverCreateInput) {
    const caregiver = await prisma.caregiver.create({
      data,
    })

    return caregiver
  }

  async update(
    caregiverId: string,
    data: Prisma.CaregiverUncheckedUpdateInput,
  ) {
    const caregiver = await prisma.caregiver.update({
      data,
      where: {
        id: caregiverId,
      },
    })

    return caregiver
  }
}
