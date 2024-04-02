import { Caregiver } from '@prisma/client'
import { compare } from 'bcryptjs'
import { CaregiversRepositoryProtocol } from '../repositories/caregivers-repository-protocol'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  caregiver: Caregiver
}

export class AuthenticateUseCase {
  constructor(private caregiversRepository: CaregiversRepositoryProtocol) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const caregiver = await this.caregiversRepository.findByEmail(email)

    if (!caregiver) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, caregiver.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      caregiver,
    }
  }
}
