import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CaregiverWithoutAPatientError } from '../../../use-cases/errors/caregiver-without-a-patient-error'
import { makeRemovePatientUseCase } from '../../../use-cases/factories/make-remove-patient-use-case'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const removePatientParamsSchema = z.object({
    patientId: z.string().uuid(),
  })

  const { patientId } = removePatientParamsSchema.parse(request.params)

  const removePatientUseCase = makeRemovePatientUseCase()

  try {
    await removePatientUseCase.execute({ patientId })

    reply.code(200).send({ message: 'Paciente e dados removidos com sucesso!' })
  } catch (err) {
    if (err instanceof CaregiverWithoutAPatientError) {
      return reply.code(409).send({ message: err.message })
    }

    throw err
  }
}
