import { Record } from '@prisma/client'
import { RecordsRepositoryProtocol } from '../repositories/records-repository-protocol'

interface CreateRecordUseCaseRequest {
  wasAccomplished: boolean
  description: string
  timeOfAccomplishment: Date
  careId: string
}

interface CreateRecordUseCaseResponse {
  record: Record
}

export class CreateRecordUseCase {
  constructor(private recordRepository: RecordsRepositoryProtocol) {}

  async execute({
    description,
    wasAccomplished,
    timeOfAccomplishment,
    careId,
  }: CreateRecordUseCaseRequest): Promise<CreateRecordUseCaseResponse> {
    // TODO: verificar com qual cuidado este registro será relacionado e se já não existe um registro criado a menos de uma hora

    const record = await this.recordRepository.create({
      description,
      was_accomplished: wasAccomplished,
      time_of_accomplishment: timeOfAccomplishment,
      care_id: careId,
    })

    return { record }
  }
}
