export class CaregiverWithoutAPatientError extends Error {
  constructor() {
    super('Você ainda não tem nenhum paciente cadastrado!')
  }
}
