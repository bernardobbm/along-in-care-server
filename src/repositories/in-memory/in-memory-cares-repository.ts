import { Alimentation, Care, Hygiene, Medication } from '@prisma/client'
import {
  CaresRepositoryProtocol,
  CreateCareInput,
} from '../cares-repository-protocol'

type CareWithPatient = Care & { patientId: string }

export class InMemoryCaresRepository implements CaresRepositoryProtocol {
  private careId = 0
  private medicationId = 0
  private hygieneId = 0
  private alimentationId = 0

  public cares: CareWithPatient[] = []

  public medications: Medication[] = []
  public hygienes: Hygiene[] = []
  public alimentations: Alimentation[] = []

  async create({
    patientId,
    careDays,
    data,
    optionalCareFields,
  }: CreateCareInput) {
    const care = {
      id: (this.careId + 1).toString(),
      category: data.category,
      title: data.title,
      description: data.description,
      frequency: data.frequency,
      start_time: new Date(data.start_time),
      schedule_type: data.schedule_type,
      interval: data.interval,
      is_continuous: data.is_continuous,
      starts_at: new Date(data.starts_at),
      ends_at: new Date(data.ends_at),
      patientId,
    }

    if (optionalCareFields?.medication && optionalCareFields.medication.unit) {
      this.medications.push({
        ...optionalCareFields.medication,
        id: String(this.medicationId + 1),
        care_id: care.id,
      })
    }

    if (
      optionalCareFields?.hygiene &&
      optionalCareFields.hygiene.instructions
    ) {
      this.hygienes.push({
        ...optionalCareFields.hygiene,
        id: String(this.hygieneId + 1),
        care_id: care.id,
      })
    }

    if (
      optionalCareFields?.alimentation &&
      optionalCareFields.alimentation.meal
    ) {
      this.alimentations.push({
        ...optionalCareFields.alimentation,
        id: String(this.alimentationId + 1),
        care_id: care.id,
      })
    }

    this.cares.push(care)

    return care
  }

  async findMany(patientId: string) {
    const care = this.cares.map((care) => {
      let medication
      let hygiene
      let alimentation

      if (care.patientId === patientId) {
        medication = this.medications.find(
          (medication) => medication.care_id === care?.id,
        )

        hygiene = this.hygienes.find((hygiene) => hygiene.care_id === care?.id)

        alimentation = this.alimentations.find(
          (alimentation) => alimentation.care_id === care?.id,
        )
      }

      return {
        ...care,
        medication,
        hygiene,
        alimentation,
      }
    })

    return care
  }
}
