import { Alimentation, Care, Hygiene, Medication } from '@prisma/client'
import {
  CaresRepositoryProtocol,
  CreateCareInput,
  UpdateCareInput,
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

  async create({ patientId, data, optionalCareFields }: CreateCareInput) {
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

  async findById(careId: string) {
    const care = this.cares.find((care) => care.id === careId) || null

    if (!care) {
      return null
    }

    const medication = this.medications.find(
      (medication) => medication.care_id === careId,
    )

    const alimentation = this.alimentations.find(
      (alimentation) => alimentation.care_id === careId,
    )

    const hygiene = this.hygienes.find((hygiene) => hygiene.care_id === careId)

    return {
      ...care,
      medication: medication || null,
      alimentation: alimentation || null,
      hygiene: hygiene || null,
    }
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

  async remove(careId: string) {
    this.cares = this.cares.filter((care) => {
      return care.id !== careId
    })

    this.medications = this.medications.filter((medication) => {
      return medication.care_id !== careId
    })

    this.hygienes = this.hygienes.filter((hygiene) => {
      return hygiene.care_id !== careId
    })

    this.alimentations = this.alimentations.filter((alimentation) => {
      return alimentation.care_id !== careId
    })
  }

  async update({ careId, data, specificCaraData }: UpdateCareInput) {
    const careIndex = this.cares.findIndex((care) => care.id === careId)

    const medicationIndex = this.medications.findIndex(
      (medication) => medication.care_id === careId,
    )

    const hygieneIndex = this.hygienes.findIndex(
      (hygiene) => hygiene.care_id === careId,
    )

    const alimentationIndex = this.alimentations.findIndex(
      (alimentation) => alimentation.care_id === careId,
    )

    const care = this.cares[careIndex]

    // todo?: corrigir tipagem desse 'keyof object' e outras que influenciem
    for (const prop in care) {
      if (data[prop as keyof object] !== undefined) {
        care[prop as keyof CareWithPatient] = data[prop as keyof object]
      }
    }

    if (specificCaraData && specificCaraData.medication) {
      const medication = this.medications[medicationIndex]

      for (const prop in medication) {
        if (specificCaraData.medication[prop as keyof object] !== undefined) {
          medication[prop as keyof Medication] =
            specificCaraData.medication[prop as keyof object]
        }
      }
    }

    if (specificCaraData && specificCaraData.hygiene) {
      const hygiene = this.hygienes[hygieneIndex]

      for (const prop in hygiene) {
        if (specificCaraData.hygiene[prop as keyof object] !== undefined)
          hygiene[prop as keyof Hygiene] =
            specificCaraData.hygiene[prop as keyof object]
      }
    }

    if (specificCaraData && specificCaraData.alimentation) {
      const alimentation = this.alimentations[alimentationIndex]

      for (const prop in alimentation) {
        if (specificCaraData.alimentation[prop as keyof object] !== undefined)
          alimentation[prop as keyof Alimentation] =
            specificCaraData.alimentation[prop as keyof object]
      }
    }

    return {
      ...care,
      medication: { ...this.medications[medicationIndex] },
      hygiene: { ...this.hygienes[hygieneIndex] },
      alimentation: { ...this.alimentations[alimentationIndex] },
    }
  }
}
