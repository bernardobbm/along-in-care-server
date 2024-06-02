import { Patient } from '@prisma/client'
import { PatientsRepositoryProtocol } from '../repositories/patients-repository-protocol'
import { PatientAlreadyExists } from './errors/patient-already-exists-error'

interface CreatePatientUseCaseRequest {
  cpf: string
  name: string
  gender: string
  dateOfBirth: Date | string
  caregiverId: string
}

interface CreatePatientUseCaseResponse {
  patient: Patient
}

export class CreatePatientUseCase {
  constructor(private patientRepository: PatientsRepositoryProtocol) {}

  async execute({
    cpf,
    name,
    gender,
    dateOfBirth,
    caregiverId,
  }: CreatePatientUseCaseRequest): Promise<CreatePatientUseCaseResponse> {
    const patientAlreadyExists = await this.patientRepository.findByCpf(cpf)

    if (patientAlreadyExists) {
      throw new PatientAlreadyExists()
    }

    const patient = await this.patientRepository.create(
      {
        cpf,
        name,
        gender,
        date_of_birth: new Date(dateOfBirth),
      },
      caregiverId,
    )

    return {
      patient,
    }
  }
}
