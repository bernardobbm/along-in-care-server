import { Caregiver } from '@prisma/client'
import { hash } from 'bcryptjs'
import { CaregiversRepositoryProtocol } from '../repositories/caregivers-repository-protocol'
import { EmailAlreadyInUseError } from './errors/email-already-in-use-error'

interface RegisterUseCaseRequest {
  name: string
  lastName: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  caregiver: Caregiver
}

export class RegisterUseCase {
  constructor(private caregiverRepository: CaregiversRepositoryProtocol) {}

  async execute({
    name,
    lastName,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.caregiverRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyInUseError()
    }

    const caregiver = await this.caregiverRepository.create({
      name,
      last_name: lastName,
      email,
      password_hash,
    })

    return {
      caregiver,
    }
  }
}
