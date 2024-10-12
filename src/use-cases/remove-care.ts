import { CaresRepositoryProtocol } from '../repositories/cares-repository-protocol'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RemoveCareUseCaseRequest {
  careId: string
}

export class RemoveCareUseCase {
  constructor(private caresRepository: CaresRepositoryProtocol) {}

  async execute({ careId }: RemoveCareUseCaseRequest): Promise<void> {
    const care = await this.caresRepository.findById(careId)

    if (!care) {
      throw new ResourceNotFoundError()
    }

    return await this.caresRepository.remove(careId)
  }
}
