import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { alterCaregiverRole } from '../../utils/alter-caregiver-role'
import { PatientsRepositoryProtocol } from '../patients-repository-protocol'

export class PrismaPatientsRepository implements PatientsRepositoryProtocol {
  async create(data: Prisma.PatientUncheckedCreateInput, caregiverId: string) {
    const patient = await prisma.patient.create({
      data: {
        ...data,
        caregivers: {
          connect: {
            id: caregiverId,
          },
        },
      },
    })

    if (patient) {
      await alterCaregiverRole(caregiverId, 'ADD')
    }

    return patient
  }

  async findByCpf(cpf: string) {
    const patient = await prisma.patient.findUnique({
      where: {
        cpf,
      },
    })

    return patient
  }

  async findById(id: string) {
    const patient = await prisma.patient.findUnique({
      where: {
        id,
      },
      include: {
        caregivers: {
          select: {
            id: true,
            email: true,
            name: true,
            last_name: true,
            role: true,
            created_at: true,
          },
        },
      },
    })

    return patient
  }

  async remove(id: string) {
    await prisma.care.deleteMany({
      where: {
        patients: {
          every: {
            id,
          },
        },
      },
    })

    await prisma.patient.delete({
      where: {
        id,
      },
    })
  }

  async update(id: string, data: Prisma.PatientUpdateInput) {
    const patient = prisma.patient.update({
      where: {
        id,
      },
      data,
    })

    return patient
  }
}
