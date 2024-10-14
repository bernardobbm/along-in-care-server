import { Caregiver } from '@prisma/client'
import { CaregiversRepositoryProtocol } from '../repositories/caregivers-repository-protocol'
import { EmailAlreadyInUseError } from './errors/email-already-in-use-error'

interface UpdateCaregiverProfileUseCaseRequest {
  name?: string
  lastName?: string
  email?: string
  password?: string
  caregiverId: string
}

interface UpdateCaregiverProfileUseCaseResponse {
  caregiver: Caregiver
}

export class UpdateCaregiverProfileUseCase {
  constructor(private caregiverRepository: CaregiversRepositoryProtocol) {}

  async execute({
    name,
    lastName,
    email,
    password,
    caregiverId,
  }: UpdateCaregiverProfileUseCaseRequest): Promise<UpdateCaregiverProfileUseCaseResponse> {
    let password_hash: string | undefined

    if (password) password_hash = password

    if (email) {
      const userWithSameEmail =
        await this.caregiverRepository.findByEmail(email)

      if (userWithSameEmail) {
        throw new EmailAlreadyInUseError()
      }
    }

    const caregiverUpdated = await this.caregiverRepository.update(
      caregiverId,
      {
        name,
        last_name: lastName,
        email,
        password_hash,
      },
    )

    return {
      caregiver: caregiverUpdated,
    }
  }
}
