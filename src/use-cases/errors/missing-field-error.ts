export class MissingFieldError extends Error {
  constructor() {
    super('Existem campos no formulário não preenchidos.')
  }
}
