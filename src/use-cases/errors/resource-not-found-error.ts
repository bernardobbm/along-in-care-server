export class ResourceNotFoundError extends Error {
  constructor() {
    super('Não foi possível encontrar o que você está procurando')
  }
}
