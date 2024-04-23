import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
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
}