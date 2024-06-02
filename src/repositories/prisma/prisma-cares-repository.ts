import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import {
  CaresRepositoryProtocol,
  CreateAlimentationCareInput,
  CreateHygieneCareInput,
  CreateMedicationCareInput,
} from '../cares-repository-protocol'

export class PrismaCaresRepository implements CaresRepositoryProtocol {
  async createCare(data: Prisma.CareCreateManyInput) {
    const care = await prisma.care.create({
      data: {
        category: data.category,
        title: data.title,
        description: data.description,
        schedule_type: data.schedule_type,
        interval: data.interval,
        is_continuous: data.is_continuous,
        starts_at: data.starts_at,
        ends_at: data.ends_at,
      },
    })

    return care
  }

  async createMedicationCare(data: CreateMedicationCareInput) {
    const medication = await prisma.medication.create({
      data: {
        unit: data.medication.unit,
        quantity: data.medication.quantity,
        administration_route: data.medication.administration_route,
        care: {
          create: {
            category: data.category,
            title: data.title,
            description: data.description,
            schedule_type: data.schedule_type,
            interval: data.interval,
            is_continuous: data.is_continuous,
            starts_at: data.starts_at,
            ends_at: data.ends_at,
          },
        },
      },
    })

    return medication
  }

  async createAlimentationCare(data: CreateAlimentationCareInput) {
    const alimentation = await prisma.alimentation.create({
      data: {
        meal: data.alimentation.meal,
        food: data.alimentation.food,
        not_recommended_food: data.alimentation.not_recommended_food,
        care: {
          create: {
            category: data.category,
            title: data.title,
            description: data.description,
            schedule_type: data.schedule_type,
            interval: data.interval,
            is_continuous: data.is_continuous,
            starts_at: data.starts_at,
            ends_at: data.ends_at,
          },
        },
      },
    })

    return alimentation
  }

  async createHygieneCare(data: CreateHygieneCareInput) {
    const hygiene = await prisma.hygiene.create({
      data: {
        instructions: data.hygiene.instructions,
        hygiene_category: data.hygiene.hygiene_category,
        care: {
          create: {
            category: data.category,
            title: data.title,
            description: data.description,
            schedule_type: data.schedule_type,
            interval: data.interval,
            is_continuous: data.is_continuous,
            starts_at: data.starts_at,
            ends_at: data.ends_at,
          },
        },
      },
    })

    return hygiene
  }
}
