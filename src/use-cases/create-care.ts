import { CaresRepositoryProtocol } from '../repositories/cares-repository-protocol'

interface CreateCareUseCaseRequest {
  careType?: 'medication' | 'alimentation' | 'hygiene'
  careProperties: any // todo: resolver tipagem
}

export class CreateCareUseCase {
  constructor(private caresRepository: CaresRepositoryProtocol) {}

  async execute({ careType, careProperties }: CreateCareUseCaseRequest) {
    let care

    const careCommonProperties = {
      category: careProperties.category,
      title: careProperties.title,
      description: careProperties.description,
      schedule_type: careProperties.scheduleType,
      interval: careProperties.interval,
      is_continuous: careProperties.isContinuous,
      starts_at: careProperties.startsAt,
      ends_at: careProperties.endsAt,
    }

    switch (careType) {
      case 'medication':
        care = await this.caresRepository.createMedicationCare({
          ...careCommonProperties,
          medication: {
            administration_route: careProperties.medication.administrationRoute,
            quantity: careProperties.medication.quantity,
            unit: careProperties.medication.unit,
          },
        })

        return {
          medication: care,
        }

      case 'alimentation':
        care = await this.caresRepository.createAlimentationCare({
          ...careCommonProperties,
          alimentation: {
            meal: careProperties.alimentation.meal,
            food: careProperties.alimentation.food,
            not_recommended_food:
              careProperties.alimentation.notRecommendedFood,
          },
        })

        return {
          alimentation: care,
        }

      case 'hygiene':
        care = await this.caresRepository.createHygieneCare({
          ...careCommonProperties,
          hygiene: {
            hygiene_category: careProperties.hygiene.hygieneCategory,
            instructions: careProperties.hygiene.instructions,
          },
        })

        return {
          hygiene: care,
        }

      default:
        care = await this.caresRepository.createCare({
          ...careCommonProperties,
        })

        return {
          care,
        }
    }
  }
}
