export class PatientAlreadyExists extends Error {
  constructor() {
    super('Paciente já cadastrado com este CPF.')
  }
}
