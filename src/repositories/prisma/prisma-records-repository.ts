import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { RecordsRepositoryProtocol } from '../records-repository-protocol'

export class PrismaRecordsRepository implements RecordsRepositoryProtocol {
  async create(data: Prisma.RecordCreateInput, careId: string) {
    const record = await prisma.record.create({
      data: {
        ...data,
        care: {
          connect: {
            id: careId,
          },
        },
      },
    })

    return record
  }

  async remove(recordId: string) {
    await prisma.record.delete({
      where: {
        id: recordId,
      },
    })
  }

  async findById(recordId: string) {
    const record = await prisma.record.findFirst({
      where: {
        id: recordId,
      },
    })

    return record
  }

  async findManyByCare(careId: string) {
    const records = await prisma.record.findMany({
      where: {
        care_id: careId,
      },
    })

    return records
  }

  async findRecordsWithinLastHour(careId: string, registerHour: Date | string) {
    const oneHourBeforeFromGivenDate = new Date(
      new Date(registerHour).getTime() - 60 * 60 * 1000,
    )

    const record = await prisma.record.findFirst({
      where: {
        care_id: careId,
        AND: {
          time_of_accomplishment: {
            gte: oneHourBeforeFromGivenDate,
          },
        },
      },
    })

    return record
  }
}
