import { Patient } from '@prisma/client'
import { CaregiversRepositoryProtocol } from '../repositories/caregivers-repository-protocol'
import { PatientsRepositoryProtocol } from '../repositories/patients-repository-protocol'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPatientProfileUseCaseRequest {
  caregiverId: string
}

interface GetPatientProfileUseCaseResponse {
  patient: Patient
}

export class GetPatientUseCase {
  constructor(
    private caregiverRepository: CaregiversRepositoryProtocol,
    private patientRepository: PatientsRepositoryProtocol,
  ) {}

  async execute({
    caregiverId,
  }: GetPatientProfileUseCaseRequest): Promise<GetPatientProfileUseCaseResponse> {
    const caregiver = await this.caregiverRepository.findById(caregiverId)

    if (!caregiver?.patient_id) {
      throw new ResourceNotFoundError()
    }

    const patient = await this.patientRepository.findById(caregiver?.patient_id)

    if (!patient) {
      throw new ResourceNotFoundError()
    }

    return { patient }
  }
}
