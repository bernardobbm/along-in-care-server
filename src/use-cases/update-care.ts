import { CaresRepositoryProtocol } from '../repositories/cares-repository-protocol'

interface UpdateCareUseCaseRequest {
  careType: 'medication' | 'alimentation' | 'hygiene' | 'other'
  careProperties: any // todo: corrigir tipagem
}

export class UpdateCareUseCase {
  constructor(private caresRepository: CaresRepositoryProtocol) {}

  async execute(
    careId: string,
    { careType, careProperties }: UpdateCareUseCaseRequest,
  ) {
    let care

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
        care = await this.caresRepository.update({
          careId,
          careDays: careProperties.careDays,
          data: { ...careCommonProperties },
          specificCaraData: {
            medication: {
              administration_route:
                careProperties.medication.administration_route,
              quantity: careProperties.medication.quantity,
              unit: careProperties.medication.unit,
            },
          },
        })

        return {
          care,
        }

      case 'alimentation':
        care = await this.caresRepository.update({
          careId,
          careDays: careProperties.careDays,
          data: { ...careCommonProperties },
          specificCaraData: {
            alimentation: {
              meal: careProperties.alimentation.meal,
              food: careProperties.alimentation.food,
              not_recommended_food:
                careProperties.alimentation.notRecommendedFood,
            },
          },
        })

        return {
          care,
        }

      case 'hygiene':
        care = await this.caresRepository.update({
          careId,
          careDays: careProperties.careDays,
          data: { ...careCommonProperties },
          specificCaraData: {
            hygiene: {
              hygiene_category: careProperties.hygiene.hygieneCategory,
              instructions: careProperties.hygiene.instructions,
            },
          },
        })

        return {
          care,
        }

      default:
        care = await this.caresRepository.update({
          careId,
          careDays: careProperties.careDays,
          data: { ...careCommonProperties },
        })

        return {
          care,
        }
    }
  }
}
