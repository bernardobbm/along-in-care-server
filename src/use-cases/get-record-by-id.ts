import { Record } from '@prisma/client'
import { RecordsRepositoryProtocol } from '../repositories/records-repository-protocol'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetRecordUseCaseRequest {
  recordId: string
}

interface GetRecordUseCaseResponse {
  record: Record
}

export class GetRecordByIdUseCase {
  constructor(private recordsRepository: RecordsRepositoryProtocol) {}

  async execute({
    recordId,
  }: GetRecordUseCaseRequest): Promise<GetRecordUseCaseResponse> {
    const record = await this.recordsRepository.findById(recordId)

    if (!record) {
      throw new ResourceNotFoundError()
    }

    return { record }
  }
}
