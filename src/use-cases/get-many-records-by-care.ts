import { Record } from '@prisma/client'
import { RecordsRepositoryProtocol } from '../repositories/records-repository-protocol'

interface GetManyRecordsByCareUseCareRequest {
  careId: string
}

interface GetManyRecordsByCareUseCareResponse {
  records: Record[]
}

export class GetManyRecordsByCareUseCare {
  constructor(private recordsRepository: RecordsRepositoryProtocol) {}

  async execute({
    careId,
  }: GetManyRecordsByCareUseCareRequest): Promise<GetManyRecordsByCareUseCareResponse> {
    const records = await this.recordsRepository.findManyByCare(careId)

    return { records }
  }
}
