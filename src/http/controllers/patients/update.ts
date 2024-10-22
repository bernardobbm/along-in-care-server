import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PatientAlreadyExists } from '../../../use-cases/errors/patient-already-exists-error'
import { makeUpdatePatientUseCase } from '../../../use-cases/factories/make-update-patient-use-case'

export async function updatePatient(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updatePatientBodySchema = z.object({
    cpf: z.string().optional(),
    name: z.string().optional(),
    gender: z.string().optional(),
    dateOfBirth: z.string().datetime().optional(),
  })

  const updatePatientParamsSchema = z.object({
    patientId: z.string().uuid(),
  })

  const { patientId } = updatePatientParamsSchema.parse(request.params)
  const data = updatePatientBodySchema.parse(request.body)

  const updatePatientUseCase = makeUpdatePatientUseCase()

  try {
    await updatePatientUseCase.execute({ patientId, data })

    reply
      .code(200)
      .send({ patient: data, message: 'Informações atualizadas com sucesso!' })
  } catch (err) {
    if (err instanceof PatientAlreadyExists) {
      return reply.code(409).send({ message: err.message })
    }

    throw err
  }
}
