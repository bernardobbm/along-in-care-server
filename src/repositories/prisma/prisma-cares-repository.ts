import { prisma } from '../../lib/prisma'
import {
  CaresRepositoryProtocol,
  CreateCareInput,
  UpdateCareInput,
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
          connect: {
            id: patientId,
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

  async remove(careId: string) {
    await prisma.care.delete({
      where: {
        id: careId,
      },
    })
  }

  async findById(careId: string) {
    const care = await prisma.care.findUnique({
      where: {
        id: careId,
      },
      include: {
        weekDays: {
          select: {
            week_day: true,
          },
        },
        medication: true,
        alimentation: true,
        hygiene: true,
      },
    })

    return care
  }

  async findMany(patientId: string) {
    const cares = await prisma.care.findMany({
      where: {
        patients: {
          every: {
            id: patientId,
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

  async update({ careId, careDays, data, specificCaraData }: UpdateCareInput) {
    const hasDaysToUpdate = careDays && careDays.length > 0

    // todo: verificar uma maneira mais eficiente de atualizar a relação de cuidados e dias
    const care = await prisma.care.update({
      where: {
        id: careId,
      },
      data: {
        ...data,
        medication: specificCaraData?.medication
          ? {
              update: {
                ...specificCaraData?.medication,
              },
            }
          : undefined,
        hygiene: specificCaraData?.hygiene
          ? {
              update: {
                ...specificCaraData?.hygiene,
              },
            }
          : undefined,
        alimentation: specificCaraData?.alimentation
          ? {
              update: {
                ...specificCaraData?.alimentation,
              },
            }
          : undefined,
        weekDays: hasDaysToUpdate
          ? {
              deleteMany: {
                care_id: careId,
              },
              create: careDays.map((careDay) => {
                return {
                  week_day: careDay,
                }
              }),
            }
          : undefined,
      },
      include: {
        medication: {
          where: {
            care_id: careId,
          },
        },
        hygiene: {
          where: {
            care_id: careId,
          },
        },
        alimentation: {
          where: {
            care_id: careId,
          },
        },
      },
    })

    return care
  }
}
