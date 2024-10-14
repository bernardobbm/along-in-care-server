import { CaregiversRepositoryProtocol } from '../repositories/caregivers-repository-protocol'

interface DeleteProfileUserCaseRequest {
  caregiverId: string
}

export class DeleteProfileUserCase {
  constructor(private caregiversRepository: CaregiversRepositoryProtocol) {}

  async execute({ caregiverId }: DeleteProfileUserCaseRequest): Promise<void> {
    return await this.caregiversRepository.delete(caregiverId)
  }
}
