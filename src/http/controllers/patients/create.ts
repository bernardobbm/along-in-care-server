import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PatientAlreadyExists } from '../../../use-cases/errors/patient-already-exists-error'
import { makeCreatePatientUseCase } from '../../../use-cases/factories/make-create-patient-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPatientBodySchema = z.object({
    cpf: z.string(),
    name: z.string(),
    gender: z.string(),
    dateOfBirth: z.date(),
  })

  const { cpf, name, gender, dateOfBirth } = createPatientBodySchema.parse(
    request.body,
  )

  const { sub } = request.user

  try {
    const createPatientUseCase = makeCreatePatientUseCase()

    await createPatientUseCase.execute({
      cpf,
      name,
      gender,
      dateOfBirth,
      caregiverId: sub,
    })
  } catch (err) {
    if (err instanceof PatientAlreadyExists) {
      reply.code(409).send({ message: err.message })
    }
  }

  reply.code(201).send()
}
