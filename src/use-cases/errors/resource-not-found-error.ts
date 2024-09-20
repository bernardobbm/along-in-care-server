export class ResourceNotFoundError extends Error {
  constructor() {
    super(
      'Desculpe, o recurso que você está tentando acessar não pôde ser encontrado.',
    )
  }
}
