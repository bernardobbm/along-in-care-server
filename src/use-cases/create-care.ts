import { CaresRepositoryProtocol } from '../repositories/cares-repository-protocol'
import { MissingFieldError } from './errors/missing-field-error'

interface CreateCareUseCaseRequest {
  careType?: 'medication' | 'alimentation' | 'hygiene'
  careProperties: any // todo: resolver tipagem
}

export class CreateCareUseCase {
  constructor(private caresRepository: CaresRepositoryProtocol) {}

  async execute(
    patientId: string,
    { careType, careProperties }: CreateCareUseCaseRequest,
  ) {
    let care

    Object.values(careProperties).forEach((careField) => {
      if (careField === undefined) {
        throw new MissingFieldError()
      }
    })

    // todo: reduzir esse bloco de objeto aqui
    const careCommonProperties = {
      category: careProperties.category,
      title: careProperties.title,
      description: careProperties.description,
      frequency: careProperties.frequency,
      start_time: careProperties.startTime,
      schedule_type: careProperties.scheduleType,
      interval: careProperties.interval,
      is_continuous: careProperties.isContinuous,
      starts_at: careProperties.startsAt,
      ends_at: careProperties.endsAt,
    }

    switch (careType) {
      case 'medication':
        care = await this.caresRepository.create({
          patientId,
          careDays: careProperties.careDays,
          data: {
            ...careCommonProperties,
          },
          optionalCareFields: {
            medication: {
              administration_route:
                careProperties.medication.administrationRoute,
              quantity: careProperties.medication.quantity,
              unit: careProperties.medication.unit,
            },
          },
        })

        return {
          medication: care,
        }

      case 'alimentation':
        care = await this.caresRepository.create({
          patientId,
          careDays: careProperties.careDays,
          data: {
            ...careCommonProperties,
          },
          optionalCareFields: {
            alimentation: {
              meal: careProperties.alimentation.meal,
              food: careProperties.alimentation.food,
              not_recommended_food:
                careProperties.alimentation.notRecommendedFood,
            },
          },
        })

        return {
          alimentation: care,
        }

      case 'hygiene':
        care = await this.caresRepository.create({
          patientId,
          careDays: careProperties.careDays,
          data: {
            ...careCommonProperties,
          },
          optionalCareFields: {
            hygiene: {
              hygiene_category: careProperties.hygiene.hygieneCategory,
              instructions: careProperties.hygiene.instructions,
            },
          },
        })

        return {
          hygiene: care,
        }

      default:
        care = await this.caresRepository.create({
          patientId,
          careDays: careProperties.careDays,
          data: {
            ...careCommonProperties,
          },
        })

        return {
          care,
        }
    }
  }
}
