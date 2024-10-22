import { PatientsRepositoryProtocol } from '../repositories/patients-repository-protocol'
import { CaregiverWithoutAPatientError } from './errors/caregiver-without-a-patient-error'

interface RemovePatientUseCaseRequest {
  patientId: string
}

export class RemovePatientUseCase {
  constructor(private patientsRepository: PatientsRepositoryProtocol) {}

  async execute({ patientId }: RemovePatientUseCaseRequest): Promise<void> {
    const patient = await this.patientsRepository.findById(patientId)

    if (!patient) {
      throw new CaregiverWithoutAPatientError()
    }

    return await this.patientsRepository.remove(patientId)
  }
}
