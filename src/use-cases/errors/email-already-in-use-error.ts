export class EmailAlreadyInUseError extends Error {
  constructor() {
    super('E-mail utilizado já em uso.')
  }
}
