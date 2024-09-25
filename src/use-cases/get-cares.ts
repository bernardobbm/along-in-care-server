import {
  Cares,
  CaresRepositoryProtocol,
} from '../repositories/cares-repository-protocol'

interface GetCaresUseCaseRequest {
  patientId: string
}

interface GetCaresUseCaseResponse {
  cares: Cares[]
}

export class GetCaresUseCase {
  constructor(private caresRepository: CaresRepositoryProtocol) {}

  async execute({
    patientId,
  }: GetCaresUseCaseRequest): Promise<GetCaresUseCaseResponse> {
    const cares = await this.caresRepository.findMany(patientId)

    return { cares }
  }
}
