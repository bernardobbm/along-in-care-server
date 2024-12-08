import { Record } from '@prisma/client'
import { RecordsRepositoryProtocol } from '../repositories/records-repository-protocol'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetAllRecordsUseCaseRequest {
  patientId: string
}

interface GetAllRecordsUseCaseResponse {
  records: Record[]
}

export class GetAllRecordsUseCase {
  constructor(private recordsRepository: RecordsRepositoryProtocol) {}

  async execute({
    patientId,
  }: GetAllRecordsUseCaseRequest): Promise<GetAllRecordsUseCaseResponse> {
    const records = await this.recordsRepository.findManyByPatient(patientId)

    if (!records) {
      throw new ResourceNotFoundError()
    }

    return {
      records,
    }
  }
}
