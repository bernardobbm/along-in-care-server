import {
  Cares,
  CaresRepositoryProtocol,
} from '../repositories/cares-repository-protocol'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetCareByIdUseCaseRequest {
  careId: string
}

export class GetCareByIdUseCare {
  constructor(private caresRepository: CaresRepositoryProtocol) {}

  async execute({ careId }: GetCareByIdUseCaseRequest): Promise<Cares> {
    const care = await this.caresRepository.findById(careId)

    if (!care) {
      throw new ResourceNotFoundError()
    }

    return care
  }
}
