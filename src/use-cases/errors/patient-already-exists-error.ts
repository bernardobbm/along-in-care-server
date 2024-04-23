export class PatientAlreadyExists extends Error {
  constructor() {
    super('Patient already exists.')
  }
}
