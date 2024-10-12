import { RecordsRepositoryProtocol } from '../repositories/records-repository-protocol'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RemoveRecordUseCaseRequest {
  recordId: string
}

export class RemoveRecordUseCase {
  constructor(private recordRepository: RecordsRepositoryProtocol) {}

  async execute({ recordId }: RemoveRecordUseCaseRequest): Promise<void> {
    const record = await this.recordRepository.findById(recordId)

    if (!record) {
      throw new ResourceNotFoundError()
    }

    return await this.recordRepository.remove(recordId)
  }
}
