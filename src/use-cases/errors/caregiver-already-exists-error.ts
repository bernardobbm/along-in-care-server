export class CaregiverAlreadyExistsError extends Error {
  constructor() {
    super('E-mail utilizado já em uso.')
  }
}
