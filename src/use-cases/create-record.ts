import { Record } from '@prisma/client'
import { RecordsRepositoryProtocol } from '../repositories/records-repository-protocol'
import { AlreadyHaveARecordForThisHourError } from './errors/already-have-a-record-for-this-hour-error'

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
    const recordsWithLessThanAHourAgo =
      await this.recordRepository.findRecordsWithinLastHour(
        careId,
        timeOfAccomplishment,
      )

    if (recordsWithLessThanAHourAgo) {
      throw new AlreadyHaveARecordForThisHourError()
    }

    const record = await this.recordRepository.create(
      {
        description,
        was_accomplished: wasAccomplished,
        time_of_accomplishment: timeOfAccomplishment,
      },
      careId,
    )

    return { record }
  }
}
