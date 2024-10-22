import { Patient } from '@prisma/client'
import { PatientsRepositoryProtocol } from '../repositories/patients-repository-protocol'
import { PatientAlreadyExists } from './errors/patient-already-exists-error'

interface UpdatePatientUseCaseRequest {
  patientId: string
  data: {
    cpf?: string
    name?: string
    gender?: string
    date_of_birth?: Date | string
  }
}

interface UpdatePatientUseCaseResponse {
  patient: Patient
}

export class UpdatePatientUseCase {
  constructor(private patientsRepository: PatientsRepositoryProtocol) {}

  async execute({
    patientId,
    data,
  }: UpdatePatientUseCaseRequest): Promise<UpdatePatientUseCaseResponse> {
    if (data.cpf) {
      const patientWithSameCpf = await this.patientsRepository.findByCpf(
        data.cpf,
      )

      if (patientWithSameCpf) {
        throw new PatientAlreadyExists()
      }
    }

    const patient = await this.patientsRepository.update(patientId, data)

    return { patient }
  }
}
