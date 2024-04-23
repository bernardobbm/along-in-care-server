import { Caregiver } from '@prisma/client'
import { CaregiversRepositoryProtocol } from '../repositories/caregivers-repository-protocol'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetCaregiverProfileUseCaseRequest {
  caregiverId: string
}

interface GetCaregiverProfileUseCaseResponse {
  caregiver: Caregiver
}

export class GetCaregiverProfileUseCase {
  constructor(private caregiverRepository: CaregiversRepositoryProtocol) {}

  async execute({
    caregiverId,
  }: GetCaregiverProfileUseCaseRequest): Promise<GetCaregiverProfileUseCaseResponse> {
    const caregiver = await this.caregiverRepository.findById(caregiverId)

    if (!caregiver) {
      throw new ResourceNotFoundError()
    }

    return {
      caregiver,
    }
  }
}
