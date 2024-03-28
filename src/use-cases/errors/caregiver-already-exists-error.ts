export class CaregiverAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
