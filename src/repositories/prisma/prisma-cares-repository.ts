import { prisma } from '../../lib/prisma'
import {
  CaresRepositoryProtocol,
  CreateCareInput,
} from '../cares-repository-protocol'

export class PrismaCaresRepository implements CaresRepositoryProtocol {
  async create({
    patientId,
    careDays,
    data,
    optionalCareFields,
  }: CreateCareInput) {
    const care = await prisma.care.create({
      data: {
        ...data,
        /**
         * Por utilizar um many-to-many explicito, se faz necessário
         * primeiro a criação da tabela de relação (representada por
         * patients aqui) e depois então o vinculo com a segunda tabela
         */
        patients: {
          create: {
            patient: {
              connect: {
                id: patientId,
              },
            },
          },
        },
        weekDays: {
          create: careDays.map((careDay) => {
            return {
              week_day: careDay,
            }
          }),
        },
        medication: {
          create:
            (optionalCareFields?.medication && {
              ...optionalCareFields.medication,
            }) ||
            undefined,
        },
        hygiene: {
          create:
            (optionalCareFields?.hygiene && {
              ...optionalCareFields.hygiene,
            }) ||
            undefined,
        },
        alimentation: {
          create:
            (optionalCareFields?.alimentation && {
              ...optionalCareFields.alimentation,
            }) ||
            undefined,
        },
      },
    })

    return care
  }

  async findMany(patientId: string) {
    const cares = await prisma.care.findMany({
      where: {
        patients: {
          every: {
            patient: {
              id: patientId,
            },
          },
        },
      },
      include: {
        medication: true,
        alimentation: true,
        hygiene: true,
      },
    })

    return cares
  }
}
