import { Record } from '@prisma/client'
import { RecordsRepositoryProtocol } from '../repositories/records-repository-protocol'
import { AlreadyHaveARecordForThisHourError } from './errors/already-have-a-record-for-this-hour-error'

interface UpdateRecordUseCaseRequest {
  recordId: string
  data: {
    was_accomplished?: boolean
    time_of_accomplishment?: Date | string
    description?: string
  }
}

interface UpdateRecordUseCaseResponse {
  record: Record
}

export class UpdateRecordUseCase {
  constructor(private recordsRepository: RecordsRepositoryProtocol) {}

  async execute({
    recordId,
    data,
  }: UpdateRecordUseCaseRequest): Promise<UpdateRecordUseCaseResponse> {
    const recordToUpdate = await this.recordsRepository.findById(recordId)

    if (recordToUpdate && data.time_of_accomplishment) {
      const hasRecordWithinLastHour =
        await this.recordsRepository.findRecordsWithinLastHour(
          recordToUpdate.care_id,
          data.time_of_accomplishment,
        )

      if (hasRecordWithinLastHour) {
        throw new AlreadyHaveARecordForThisHourError()
      }
    }

    const record = await this.recordsRepository.update(recordId, data)

    return {
      record,
    }
  }
}
