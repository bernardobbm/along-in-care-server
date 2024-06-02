import { Alimentation, Care, Hygiene, Medication, Prisma } from '@prisma/client'
import {
  CaresRepositoryProtocol,
  CreateAlimentationCareInput,
  CreateHygieneCareInput,
  CreateMedicationCareInput,
} from '../cares-repository-protocol'

export class InMemoryCaresRepository implements CaresRepositoryProtocol {
  public careId = 0
  public medicationId = 0
  public alimentationId = 0
  public hygieneId = 0

  public cares: Care[] = []

  public medications: Medication[] = []
  public hygienes: Hygiene[] = []
  public alimentations: Alimentation[] = []

  async createCare(data: Prisma.CareCreateInput) {
    const care = {
      id: (this.careId + 1).toString(),
      category: data.category,
      title: data.title,
      description: data.description,
      schedule_type: data.schedule_type,
      interval: data.interval,
      is_continuous: data.is_continuous,
      starts_at: new Date(data.starts_at),
      ends_at: new Date(data.ends_at),
    }

    this.cares.push(care)

    return care
  }

  async createMedicationCare(data: CreateMedicationCareInput) {
    const medicationCare = {
      id: (this.careId + 1).toString(),
      category: data.category,
      title: data.title,
      description: data.description,
      schedule_type: data.schedule_type,
      interval: data.interval,
      is_continuous: data.is_continuous,
      starts_at: new Date(data.starts_at),
      ends_at: new Date(data.starts_at),
    }

    const medication = {
      id: (this.medicationId + 1).toString(),
      care_id: medicationCare.id,
      quantity: data.medication.quantity,
      unit: data.medication.unit,
      administration_route: data.medication.administration_route,
    }

    this.cares.push(medicationCare)
    this.medications.push(medication)

    return medication
  }

  async createAlimentationCare(data: CreateAlimentationCareInput) {
    const alimentationCare = {
      id: (this.careId + 1).toString(),
      category: data.category,
      title: data.title,
      description: data.description,
      schedule_type: data.schedule_type,
      interval: data.interval,
      is_continuous: data.is_continuous,
      starts_at: new Date(data.starts_at),
      ends_at: new Date(data.starts_at),
    }

    const alimentation = {
      id: (this.alimentationId + 1).toString(),
      care_id: alimentationCare.id,
      meal: data.alimentation.meal,
      food: data.alimentation.food,
      not_recommended_food: data.alimentation.not_recommended_food,
    }

    this.cares.push(alimentationCare)
    this.alimentations.push(alimentation)

    return alimentation
  }

  async createHygieneCare(data: CreateHygieneCareInput) {
    const hygieneCare = {
      id: (this.careId + 1).toString(),
      category: data.category,
      title: data.title,
      description: data.description,
      schedule_type: data.schedule_type,
      interval: data.interval,
      is_continuous: data.is_continuous,
      starts_at: new Date(data.starts_at),
      ends_at: new Date(data.starts_at),
    }

    const hygiene = {
      id: (this.hygieneId + 1).toString(),
      care_id: hygieneCare.id,
      hygiene_category: data.hygiene.hygiene_category,
      instructions: data.hygiene.instructions,
    }

    this.cares.push(hygieneCare)
    this.hygienes.push(hygiene)

    return hygiene
  }
}
