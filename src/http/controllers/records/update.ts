import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AlreadyHaveARecordForThisHourError } from '../../../use-cases/errors/already-have-a-record-for-this-hour-error'
import { makeUpdateRecordUseCase } from '../../../use-cases/factories/make-update-record-use-case'

export async function updateRecord(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateRecordParamsSchema = z.object({
    recordId: z.string(),
  })

  const updateRecordBodySchema = z.object({
    wasAccomplished: z.boolean().optional(),
    timeOfAccomplishment: z.coerce.date().optional(),
    description: z.string().optional(),
  })

  const { recordId } = updateRecordParamsSchema.parse(request.params)
  const data = updateRecordBodySchema.parse(request.body)

  const updateRecordUseCase = makeUpdateRecordUseCase()

  try {
    await updateRecordUseCase.execute({ recordId, data })

    reply
      .code(200)
      .send({ record: data, message: 'Informações atualizadas com sucesso!' })
  } catch (err) {
    if (err instanceof AlreadyHaveARecordForThisHourError) {
      return reply.code(409).send({ message: err.message })
    }

    throw err
  }
}
