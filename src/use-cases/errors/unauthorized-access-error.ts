export class UnauthorizedAccessError extends Error {
  constructor() {
    super(
      'O recurso que você está tentando acessar requer autenticação. Faça login e tente novamente.',
    )
  }
}
