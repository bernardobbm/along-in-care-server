import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AlreadyHaveARecordForThisHourError } from '../../../use-cases/errors/already-have-a-record-for-this-hour-error'
import { makeCreateRecordUseCase } from '../../../use-cases/factories/make-create-record-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createRecordParamsSchema = z.object({
    careId: z.string(),
  })

  const createRecordBodySchema = z.object({
    wasAccomplished: z.boolean(),
    timeOfAccomplishment: z.coerce.date(),
    description: z.string(),
  })

  const { careId } = createRecordParamsSchema.parse(request.params)
  const { description, timeOfAccomplishment, wasAccomplished } =
    createRecordBodySchema.parse(request.body)

  try {
    const createRecordUseCase = makeCreateRecordUseCase()

    await createRecordUseCase.execute({
      description,
      timeOfAccomplishment,
      wasAccomplished,
      careId,
    })

    reply.code(201).send({ message: 'Registro adicionado!' })
  } catch (err) {
    if (err instanceof AlreadyHaveARecordForThisHourError) {
      return reply.code(409).send({ message: err.message })
    }
  }
}
