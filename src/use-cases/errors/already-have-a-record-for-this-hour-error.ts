export class AlreadyHaveARecordForThisHourError extends Error {
  constructor() {
    super('Já há um registro deste cuidado com menos de uma hora!')
  }
}
